import { input } from './input'

const twoSumAndMultiply = (arr) => {
  const hash = {}
  const target = 2020
  for (let i = 0; i < arr.length; i++) {
    const diff = target - arr[i]
    if (diff in hash) {
      return arr[i] * arr[hash[diff]]
    } else {
      hash[arr[i]] = i
    }

  }
}

const threeSumAndMultiply = (arr) => {
  const hash = {}
  const target = 2020
  // fuck it brute force
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = 0; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === target) {
          return arr[i] * arr[j] * arr[k];
        }
      }
    }
  }
}

console.log('part one: ' + twoSumAndMultiply(input))
console.log('part two: ' + threeSumAndMultiply(input))