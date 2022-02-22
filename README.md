# @Mazaryk/wordcount

A simple cli word count tool

## Installation
### yarn
```
yarn global add @mazaryk/wordcount
```
### npm
```
npm install -g @mazaryk/wordcount
```

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
