import { readFileSync } from 'fs' 

const input = readFileSync('src/dec09/input').toString()
const data = input.split('\n')

const getAllTwoSums = (arr, target) => {
  const pairs = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (parseInt(arr[i]) + parseInt(arr[j]) === parseInt(target) && arr[i] !== arr[j]) {
        pairs.push([arr[i], arr[j]])
      }
    }
  }
  return pairs
}


const findBadNumber = (data) => {
  for (let i = 25; i < data.length; i++) {
    const arr = data.slice(i - 25, i)
    const resultsArray = getAllTwoSums(arr, data[i])

    if (resultsArray.length === 0) {
      return data[i]
    }
  }
}

const getRange = (arr, target) => {
  const numArray = arr.map((a) => parseInt(a))

  let range = []
  let lowIndex = 0
  let highIndex = 2
  
  while (lowIndex < numArray.length - 1 && highIndex < numArray.length) {
    const range = numArray.slice(lowIndex, highIndex + 1)
    const sumOfRange = range.reduce((a, b) => a + b, 0)
    if (sumOfRange === target)  {
      return range
    } else if (sumOfRange < target) {
      highIndex++
    } else if (sumOfRange > target) {
      lowIndex++
      highIndex = lowIndex + 2
    }
  }
  return range
}

const findEncryptionWeakness = (data) => {
  const badNumber = findBadNumber(data)
  const range = getRange(data, badNumber)
  return Math.min(...range) + Math.max(...range)
}

console.log('part one', findBadNumber(data))
console.log('part two', findEncryptionWeakness(data))