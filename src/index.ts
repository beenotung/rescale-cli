/**
 * @description the reminds can be zero, positive or negative
 */
export function rescale(options: { full: number; values: number[] }) {
  let inputs = options.values
  let n = inputs.length

  if (n == 0) {
    throw new Error('no values specified')
  }

  let full = options.full

  let total = 0
  for (let i = 0; i < n; i++) {
    total += inputs[i]
  }

  let reminds = full
  let values: number[] = new Array(n)

  for (let i = 0; i < n; i++) {
    let value = Math.round((inputs[i] / total) * full)
    reminds -= value
    values[i] = value
  }

  return { reminds, values }
}
