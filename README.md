# rescale-cli

Calculates proportional values based on input and a full value

[![npm Package Version](https://img.shields.io/npm/v/rescale-cli)](https://www.npmjs.com/package/rescale-cli)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/rescale-cli)](https://bundlephobia.com/package/rescale-cli)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/rescale-cli)](https://bundlephobia.com/package/rescale-cli)

## Features

- lightweight cli tool (zero dependency)
- multiple output mode (array, row, line)
- custom full value (default 100)
- round to integer
- remind for remaining value or exceeding value

## Installation (Optional)

```bash
npm install -g rescale-cli
```

If you don't want to install it globally, you can invoke it using npx, e.g. `npx -y rescale-cli --help`

You can also install `rescale-cli` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/)

## Usage

```
rescale-cli v${pkg.version}
Usage: rescale-cli [OPTIONS] VALUE1 VALUE2 ...

This tool calculates proportional values based on input and a full value.

Options:
  -f, --full NUMBER    Set the full value (default: 100)
  -a, --array          Output result as an array
  -r, --row            Output result as space-separated values in a row (default)
  -l, --line           Output result with each value on a new line

  -h, --help           Display this help message
  -v, --version        Display version information

Arguments:
  VALUE1 VALUE2 ...    Input values to be proportionally adjusted

Examples:

Description:
  The script takes a series of numeric values and adjusts them proportionally
  to fit within a specified full value (default 100).

  The result is output in the specified format (array, row, or line).

  If the adjusted values don't exactly match the full value due to rounding,
  a warning message will be displayed showing the difference.

Note:
  The full value must be a positive integer.

  The options can be specified anywhere in the argument.
```

### Usage Example

```javascript
> rescale-cli 1 2 3
17 33 50

> rescale-cli -f 10 1 2 3
2 3 5

> npx rescale-cli --array 1 2 3
[ 17, 33, 50 ]

> npx -y rescale-cli 10 15 25 31 --full 50 --line
Warning: reminds 1
6
9
15
19

> npx --yes rescale-cli 10 15 25 31 30 --full 50 --line
Warning: exceed 1
5
7
11
14
14
```
