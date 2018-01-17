const builder = require('xmlbuilder');

class JUnitReporter {
  constructor(options) {
    this.options = options || {};
  }

  start() {}

  pass() {}

  fail() {}

  ignore() {}

  end(testResults) {
    const tests = testResults.length;
    const failures = testResults.filter(t => t.result == 'fail').length;
    const skipped = testResults.filter(t => t.result == 'ignore').length;

    const testsuiteElement = builder
      .create('testsuites', { tests, failures, skipped })
      .att({ tests, failures, skipped })
      .element('testsuite')
      .att({ tests, failures, skipped });

    testResults.forEach(testResult => {
      const testcaseElement = testsuiteElement
        .element('testcase', { name: testResult.name, classname: 'npm.licenseTests'})
        .element('system-out', `licensed under ${testResult.licenses}`)
        .up();

      if (testResult.result == 'fail') {
        testcaseElement
          .element('error')
          .cdata(testResult.message);
      }

      if (testResult.result == 'ignore') {
        testcaseElement
          .element('skipped');
      }
    });

    const output = testsuiteElement.end({ pretty: true});

    console.log(output);
  }
}

module.exports = JUnitReporter;