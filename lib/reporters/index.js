module.exports = {
  junit: require('./junit'),
  text: require('./text'),
  silent: require('./silent'),

  create(reporter, options) {
    const Reporter = this[reporter];

    return new Reporter(options);
  }
}