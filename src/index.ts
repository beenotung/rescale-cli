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

  while (reminds != 0) {
    let refs = values
      .map((value, index) => ({
        input: inputs[index],
        value,
        index,
        diff: inputs[index] / total - value / full,
      }))
      .filter(ref => {
        if (reminds > 0) {
          return ref.diff > 0
        }
        if (reminds < 0) {
          return ref.diff < 0
        }
      })

    let max = refs.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0]

    let matches = refs.filter(ref => ref.diff == max.diff)

    if (matches.length > Math.abs(reminds)) {
      break
    }

    for (let match of matches) {
      if (reminds > 0) {
        reminds--
        match.diff--
        values[match.index]++
      }
      if (reminds < 0) {
        reminds++
        match.diff++
        values[match.index]--
      }
    }
  }

  return { reminds, values }
}
