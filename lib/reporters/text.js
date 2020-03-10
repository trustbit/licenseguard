const symbols = require('./symbols');
const chalk = require('chalk');
const log = require('./log');

class TextReporter {
  constructor(options) {
    this.options = options || {};
    this.stats = {
      pass: 0,
      fail: 0,
      ignore: 0,
      total: 0,
    };

    this.messages = {
      pass: [],
      fail: [],
      ignore: [],
    }
  }

  start() {
    log();
  }

  pass(test) {
    this.stats.pass++;
    this.stats.total++;
    this.messages.pass.push(`    ${chalk.green(symbols.pass)} ${test.name} ${chalk.gray(test.licenses)}`);
  }

  fail(test) {
    this.stats.fail++;
    this.stats.total++;

    this.messages.fail.push(`    ${chalk.red(symbols.fail)} ${test.name} ${chalk.gray(test.licenses)} - ${test.message}`);
  }

  ignore(test) {
    this.stats.ignore++;
    this.stats.total++;

    this.messages.ignore.push(`    ${chalk.yellow(symbols.ignore)} ${test.name} ${chalk.gray(test.licenses)}`);
  }

  end() {
    log('  Passed');
    this.messages.pass.forEach(m => log(m));

    if (this.messages.ignore.length > 0) {
      log();
      log('  Ignored');
      this.messages.ignore.forEach(m => log(m));
    }

    if (this.messages.fail.length > 0) {
      log();
      log('  Failed');
      this.messages.fail.forEach(m => log(m));
    }

    log();
    log(`  Tested ${this.stats.total} package licenses`);
    log(`    Passed:   ${chalk.green(this.stats.pass)}`);
    log(`    Ignored:  ${chalk.yellow(this.stats.ignore)}`);
    log(`    Failed:   ${chalk.red(this.stats.fail)}`);
  }
}

module.exports = TextReporter;