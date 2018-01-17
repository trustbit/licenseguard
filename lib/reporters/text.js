const symbols = require('./symbols');
const chalk = require('chalk');

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
    console.log();
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
    console.log('  Passed');
    this.messages.pass.forEach(m => console.log(m));

    if (this.messages.ignore.length > 0) {
      console.log();
      console.log('  Ignored');
      this.messages.ignore.forEach(m => console.log(m));
    }

    if (this.messages.fail.length > 0) {
      console.log();
      console.log('  Failed');
      this.messages.fail.forEach(m => console.log(m));
    }

    console.log();
    console.log(`  Tested ${this.stats.total} package licenses`);
    console.log(`    Passed:   ${chalk.green(this.stats.pass)}`);
    console.log(`    Ignored:  ${chalk.yellow(this.stats.ignore)}`);
    console.log(`    Failed:   ${chalk.red(this.stats.fail)}`);
  }
}

module.exports = TextReporter;