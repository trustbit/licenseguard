const licenseChecker = require('license-checker');
const satisfies = require('spdx-satisfies');
const parse = require('spdx-expression-parse');
const matcher = require('matcher');

class Runner {
  constructor(options) {
    this.options = options || {};
    this.options.path = this.options.path || process.cwd();
    this.options.production = !!this.options.production;
    this.options.development = !!this.options.development;

    this.options.blacklist = this.options.blacklist || [];
    if (!Array.isArray(this.options.blacklist)) {
      this.options.blacklist = [this.options.blacklist];
    }

    assertValidLicenses(this.options.blacklist);

    this.options.ignore = this.options.ignore || [];
    if (!Array.isArray(this.options.ignore)) {
      this.options.ignore = [this.options.ignore];
    }
  }

  async execute(reporter) {
    const tests = await this.buildTests();

    reporter.start(tests);

    tests.forEach(test => {
        if (this.options.ignore.some(ignore => matcher.isMatch(test.name, ignore))) {
          test.result = 'ignore';
          reporter.ignore(test);
          return;
        }

        // TODO: Bug License specification (BSD-2-Clause OR MIT OR Apache-2.0) violates blacklisted license Apache-2.0?
        // TODO: Trim License expressions - UNKNOWN...
        let blacklistedLicense;

        try {
          blacklistedLicense = this.options.blacklist.find(license => satisfies(license, test.licenses));
        } catch (e) {
          test.result = 'fail';
          test.message = `${test.licenses} could not be parsed as valid SPDX license`;
          reporter.fail(test);
          return;
        }

        if (blacklistedLicense) {
          test.result = 'fail';
          test.message = `${test.licenses} is blacklisted`;
          reporter.fail(test);
        } else {
          test.result = 'pass';
          reporter.pass(test);
        }
    });

    reporter.end(tests);

    return tests;
  }

  async buildTests() {
    const pkgLicenses = await this.getLicenses();

    return Object.keys(pkgLicenses).map(pkg => {
      return {
        name: pkg,
        licenses: pkgLicenses[pkg].licenses,
      }
    });
  }

  async getLicenses() {
    return new Promise((resolve, reject) => licenseChecker.init({
      start: this.options.path,
      production: this.options.production,
      development: this.options.development,
    }, (err, pkgLicenses) => err ? reject(err) : resolve(pkgLicenses)));
  }
}

function assertValidLicenses(licenses) {
  const invalidLicenses = licenses.filter(license => {
    try {
      parse(license);
      return false;
    } catch (e) {
      return true;
    }
  });

  if (invalidLicenses.length > 0) {
    throw new Error(`Licenses "${invalidLicenses.join(', ')}" were not specified in a valid SDPX format`);
  }
}

module.exports = Runner;