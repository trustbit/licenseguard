const Runner = require('../lib/runner');
const { expect } = require('chai');

describe('runner', () => {
  it('should create new instances with undefined options specified', () => {
    const runner = new Runner();

    expect(runner).to.exist;
  });
});