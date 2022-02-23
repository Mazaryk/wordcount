# @mazaryk/wordcount

A simple cli word count tool

## Usage
```
$ wordcount ~/some/file.txt
```

## Options
```
$ wordcount --help
Usage: wordcount [options] <file>

Count word frequency in an input file

Arguments:
  file                  The file to parse

Options:
  -v, --version         output the version number
  -c, --case-sensitive  case-sensitive word compare (default: false)
  -h, --help            display help for command

```

## Installation

### 1) Use npm/yarn To Install Globally
Assuming you have nodejs installed, you can install the cli globally:

```
$ yarn global add @mazaryk/wordcount
```
```
$ npm i -g @mazaryk/wordcount
```

### 2) Build From Source
If you would like to build from source, you can clone the git repo, build, optionally run tests, and finally link the 'binary' in your PATH.
```
$ git clone https://github.com/Mazaryk/wordcount.git
...
$ cd wordcount
$ yarn install
...
$ yarn run build
...
$ yarn run test
...
$ yarn run link
```
After linking, the ```wordcount``` cli should be available in a new terminal.

If preferred, once the project has been built, you can skip the linking step and run the script directly with node:
```
$ node bin/index.js ./test/.mock_data/input.txt
```

### Removing/Unlinking
If you installed globally you can remove the cli:
```
$ yarn global remove @mazaryk/wordcount
```
```
$ npm uninstall -g @mazaryk/wordcount
```

If you built from source and linked, you can remove ```wordcount``` from your path by unlinking:
```
$ yarn run unlink
```

### Assumptions
- Words are counted in a case-insensitive manner by default. (use -c to make it case-sensitive)
- Output is sorted by count. Matching counts are sorted alphabetically.
