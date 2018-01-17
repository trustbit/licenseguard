module.exports = {
  junit: require('./junit'),
  text: require('./text'),

  create(reporter, options) {
    const Reporter = this[reporter];

    return new Reporter(options);
  }
}