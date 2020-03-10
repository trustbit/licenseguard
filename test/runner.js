const Runner = require('../lib/runner');
const reporters = require('../lib/reporters');
const { expect } = require('chai');

describe('runner', () => {
  it('should create new instances with undefined options specified', () => {
    const runner = new Runner();

    expect(runner).to.exist;
  });

  it('should execute', async () => {
    const runner = new Runner();
    const reporter = reporters.create('junit');

    await runner.execute(reporter);
  });
});