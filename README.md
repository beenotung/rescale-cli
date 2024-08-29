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
rescale-cli [OPTIONS] VALUE1 VALUE2 ...
```

**Description**:

The script takes a series of numeric values and adjusts them proportionally
to fit within a specified full value (default 100).

The result is output in the specified format (array, row, or line).

If the adjusted values don't exactly match the full value due to rounding,
a warning message will be displayed showing the difference.

**Note**:

The full value must be a positive integer.

The options can be specified anywhere in the argument.

### CLI Options

| Short Flag | Long Flag   | Argument | Description                                      | Default |
| ---------- | ----------- | -------- | ------------------------------------------------ | ------- |
| `-f`       | `--full`    | NUMBER   | Set the full value (a positive integer)          | 100     |
| `-a`       | `--array`   |          | Output result as an array                        |         |
| `-r`       | `--row`     |          | Output result as space-separated values in a row | ✓       |
| `-l`       | `--line`    |          | Output result with each value on a new line      |         |
| `-h`       | `--help`    |          | Display the help message                         |         |
| `-v`       | `--version` |          | Display version information                      |         |

### Usage Example

```javascript
> rescale-cli 1 2 3
17 33 50

> npx rescale-cli --array 1 2 3
[ 17, 33, 50 ]

> rescale-cli --full 10 1 2 3 --line
2
3
5

> npx -y rescale-cli 1 3 1 4 --full 50 --array
Warning: exceeds 1
[ 6, 17, 6, 22 ]

> npx --yes rescale-cli 1 3 1 4 --full 49 --array
Warning: reminds 1
[ 5, 16, 5, 22 ]
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
