const Runner = require('../lib/runner');
const reporters = require('../lib/reporters');
const log = require('../lib/reporters/log');
const { expect } = require('chai');

describe('runner', function() {
  this.timeout(5000); // increase timeout since we're reading the package tree

  let result = '';

  beforeEach(() => {
    result = '';
    log.backend = function(output) {
      result += output;
    }
  });

  afterEach(() => {
    log.backend = console.log;
  });

  it('should create new instances with undefined options specified', () => {
    const runner = new Runner();

    expect(runner).to.exist;
  });

  it('should build a report containing package dependencies', async () => {
    const runner = new Runner();
    const reporter = reporters.create('junit');

    await runner.execute(reporter);

    expect(result).to.contain('license-checker');
    expect(result).to.not.contain('<error>');
  });

  it('should check only development dependencies if specified in options', async () => {
    const runner = new Runner({ development: true, production: false });
    const reporter = reporters.create('junit');

    await runner.execute(reporter);

    expect(result).to.not.contain('license-checker');
    expect(result).to.contain('mocha');
    expect(result).to.not.contain('<error>');
  });

  it('should check only production dependencies if specified in options', async () => {
    const runner = new Runner({ development: false, production: true });
    const reporter = reporters.create('junit');

    await runner.execute(reporter);

    expect(result).to.contain('license-checker');
    expect(result).to.not.contain('mocha');
    expect(result).to.not.contain('<error>');
  });

  it('should add failed tests if license is blacklisted', async () => {
    const runner = new Runner({ blacklist: 'MIT' });
    const reporter = reporters.create('junit');

    await runner.execute(reporter);

    expect(result).to.contain('license-checker');
    expect(result).to.contain('mocha');
    expect(result).to.contain('<error>');
  });

  it('should add ignore results for ignored tests', async () => {
    const runner = new Runner({ ignore: 'mocha*' });
    const reporter = reporters.create('junit');

    await runner.execute(reporter);

    expect(result).to.contain('license-checker');
    expect(result).to.contain('mocha');
    expect(result).to.contain('<skipped/>');
  });

  it('should throw if invalid licenses are blacklisted', async () => {
    expect(() => {
      new Runner({ blacklist: 'MITTAG' });
    }).to.throw('Licenses "MITTAG" were not specified in a valid SDPX format');
  });
})
.timeout(5000); // increase timeout since we're analzying the package tree here