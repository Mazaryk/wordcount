# @mazaryk/wordcount

A simple cli word count tool

## Installation

If you have nodejs installed, you can install the cli globally.

### yarn
```
yarn global add @mazaryk/wordcount
```
### npm
```
npm i -g @mazaryk/wordcount
```

If you would rather build from source and install, you can clone the git repo, build, optionally run tests, and finally link the 'binary' in your PATH.
```
$ git clone git@github.com:Mazaryk/wordcount.git
...
$ cd wordcount
$ yarn install
...
$ yarn build
...
$ yarn test
...
$ yarn link
```
After linking, ```wordcount``` should be available in a new terminal.

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



### Assumptions

- Words are counted in a case-insensitive manner by default. (use -c to make it case-sensitive)
- Output is sorted by count. Matching counts are sorted alphabetically.
