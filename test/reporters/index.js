const reporters = require('../../lib/reporters');
const { expect } = require('chai');

describe('reporters', () => {
  it('should create a text reporter', () => {
    const reporter = reporters.create('text');
    expect(reporter).to.exist;
  });

  it('should create a junit reporter', () => {
    const reporter = reporters.create('junit');
    expect(reporter).to.exist;
  });
});