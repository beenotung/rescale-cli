import { rescale } from '.'

type Mode = 'array' | 'row' | 'line'

let mode: Mode = 'row'
let full = 100
var values: number[] = []

if (process.argv.length == 2) {
  printVersion()
  console.log('Hint: run with --help to show help message.')
  process.exit(0)
}

for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i]
  switch (arg) {
    case '-h':
    case '--help':
      printHelp()
      process.exit(0)
    case '-v':
    case '--version':
      printVersion()
      process.exit(0)
    case '-f':
    case '--full':
      if (i + 1 == process.argv.length) {
        console.error('Error: missing argument after ' + JSON.stringify(arg))
        process.exit(1)
      }
      arg = process.argv[++i]
      full = +arg
      if (!Number.isInteger(full)) {
        console.error(
          'Error: full value should be integer, got ' + JSON.stringify(arg),
        )
        process.exit(1)
      }
      if (full <= 0) {
        console.error(
          'Error: full value should be larger than zero, got ' + arg,
        )
        process.exit(1)
      }
      break
    case '-a':
    case '--array':
      mode = 'array'
      break
    case '-r':
    case '--row':
      mode = 'row'
      break
    case '-l':
    case '--line':
      mode = 'line'
      break
    default:
      let value = +arg
      if (!value && value !== 0) {
        console.error(`Error: unknown argument ${JSON.stringify(arg)}`)
        process.exit(1)
      }
      values.push(value)
      break
  }
}

function printVersion() {
  let pkg = require('../package.json')
  console.log(`rescale-cli v${pkg.version}`)
}

function printHelp() {
  printVersion()
  console.log()
  console.log(
    `
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
  rescale-cli 30 20 50
  rescale-cli -f 1000 300 200 500
  rescale-cli --array 1 2 3 4
  rescale-cli 10 15 25 --full 50 --line

Description:
  The script takes a series of numeric values and adjusts them proportionally
  to fit within a specified full value (default 100).

  The result is output in the specified format (array, row, or line).

  If the adjusted values don't exactly match the full value due to rounding,
  a warning message will be displayed showing the difference.

Note:
  The full value must be a positive integer.

  The options can be specified anywhere in the argument.
`.trim(),
  )
}

try {
  var { reminds, values } = rescale({ full, values })
} catch (error) {
  console.error(String(error))
  process.exit(1)
}

if (reminds > 0) {
  console.error('Warning: reminds ' + reminds)
} else if (reminds < 0) {
  console.error('Warning: exceeds ' + -reminds)
}

switch (mode) {
  case 'array':
    console.log(values)
    break
  case 'row':
    console.log(values.join(' '))
    break
  case 'line':
    for (let value of values) {
      console.log(value)
    }
    break
}
