# License Guard

Command line tool for running license checks to guard you from using packages with blacklisted licenses. Integrates well into your ci workflow.
Uses [license-checker](https://www.npmjs.com/package/license-checker) under the hood.

[![Build Status](https://travis-ci.org/Softwarepark/licenseguard.svg?branch=master)](https://travis-ci.org/Softwarepark/licenseguard)

## Install

```bash
npm i licenseguard -g
```

## Usage

```bash
Usage: licenseguard [options]

Options:
  --production              Test only production dependencies
  --development             Test only development dependencies
  --blacklist <license>     Test that license is not used in any npm dependency
  --ignore <package>        Ignore package matching <package> allows star patterns
  --path <path>             Test "path" for license violations. Defaults to current directory
  --reporter                Reporter to use. Supported reporters: "text", "junit" and "silent" to supress output
  --nofail                  Exit with error code 0 even if blacklisted licenses were found
  --licenses                Print a list of valid license names that can be used in blacklist
  --help                    Print help

Examples:

  Test that no "beerware license" dependency was used            $ licenseguard --blacklist Beerware
  List of blacklisted licenses                                   $ licenseguard --blacklist beerware --blacklist AGPL-3.0
  Ignore a dependency                                            $ licenseguard --ignore yargs@10.0.3
  Ignore multiple dependencies                                   $ licenseguard --ignore yargs@10.0.3 --ignore doctrine@2.1.0
```

## The `licenseguardrc` file

You can configure blacklist and ignore dependencies in a `.licenseguardrc` file in the directory you wish to license test

*Example*

```json
{
    "blacklist": ["Apache-2.0", "CC-BY-3.0"],
    "ignore": ["rc@1.2.3"]
}
```

Ignores dependency `rc@1.2.3` and blacklists licenses `Apache-2.0`, `CC-BY-3.0`.

## Valid License Ids

You can print a list of valid SPDX license ids `licenseguard --licenses`

## Integration with Jenkins

licenseguard comes with an integrated JUnit reporter. You will need to install [JUnit Plugin](https://wiki.jenkins.io/display/JENKINS/JUnit+Plugin).

*Add a build step*

Add a "Execute Windows batch command" or "Execute shell" build step and configure the command like this to use the `junit` reporter and pipe the output to a file.

```bash
licenseguard --reporter junit > licenseguard-results.xml
```

*Add a post build action*

Add a "Publish JUnit test result report" post build action and specify a file pattern matching the output file of the build step before.

After you run a build you should see something like this in jenkins project

![Test Result Trend](https://github.com/Softwarepark/licenseguard/blob/master/assets/jenkins-test-overview.png)

![Test Result](https://github.com/Softwarepark/licenseguard/blob/master/assets/jenkins-test-detail.png)
