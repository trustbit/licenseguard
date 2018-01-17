const symbols = {
  pass: '✓',
  fail: '✖',
  ignore: '~',
}

// With node.js on Windows: use symbols available in terminal default fonts
if (process.platform === 'win32') {
  symbols.pass = '\u221A';
  symbols.fail = '\u00D7';
}

module.exports = symbols;