# License Test

Test runner built on [license-checker](https://www.npmjs.com/package/license-checker) to test licenses of npm dependencies against blacklists.

## Install

```bash
npm i license-test -g
```

## Usage

```bash
Usage: license-test [options]

Options:
  --production              Test only production dependencies
  --development             Test only development dependencies
  --blacklist <license>     Test that license is not used in any npm dependency
  --ignore <package>        Ignore package <package> and do not check against blacklist
  --path <dirname>          Test "path" for license violations. Defaults to current directory
  --reporter                Reporter to use. Supported reporters: "text", "junit"
  --licenses                Print a list of valid license names that can be used in blacklist
  --help                    Print help

Examples:

  Test that no "beerware license" dependency was used            $ license-test --blacklist Beerware
  List of blacklisted licenses                                   $ license-test --blacklist beerware --blacklist AGPL-3.0
  Ignore a dependency                                            $ license-test --ignore yargs@10.0.3
  Ignore multiple dependencies                                   $ license-test --ignore yargs@10.0.3 --ignore doctrine@2.1.0
```

## The `licensetestrc` file

You can configure blacklist and ignore dependencies in a `.licensetestrc` file in the directory you wish to license test

*Example*

```json
{
    "blacklist": ["Apache-2.0", "CC-BY-3.0"],
    "ignore": ["rc@1.2.3"]
}
```

Ignores dependency `rc@1.2.3` and blacklists licenses `Apache-2.0`, `CC-BY-3.0`.

## Valid License Ids

You can print a list of valid SPDX license ids `license-test --licenses`

## Integration with Jenkins

license-test comes with an integrated JUnit reporter. You will need to install [JUnit Plugin](https://wiki.jenkins.io/display/JENKINS/JUnit+Plugin).

*Add a build step*

Add a "Execute Windows batch command" or "Execute shell" build step and configure the command like this to use the `junit` reporter and pipe the output to a file.

```bash
license-test --reporter junit > license-test-results.xml
```

*Add a post build action*

Add a "Publish JUnit test result report" post build action and specify a file pattern matching the output file of the build step before.

After you run a build you should see something like this in jenkins project

![Test Result Trend](https://github.com/Softwarepark/license-test/blob/master/assets/jenkins-test-overview.png)

![Test Result](https://github.com/Softwarepark/license-test/blob/master/assets/jenkins-test-detail.png)

