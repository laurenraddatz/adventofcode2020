import { readFileSync } from 'fs' 

const input = readFileSync('src/dec15/input').toString().split(',').map(a => parseInt(a))

const partOne = () => {
  const memory = [...input]

  for (let i = input.length; i < 2020; i++) {
    const lastNumberSpoken = memory[memory.length - 1]
    const lastNumberIndex = memory.lastIndexOf(lastNumberSpoken, memory.length - 1)
    const lastNumberLastIndex = memory.lastIndexOf(lastNumberSpoken, lastNumberIndex - 1)
    lastNumberLastIndex >= 0
      ? memory.push(lastNumberIndex - lastNumberLastIndex)
      : memory.push(0)
  }
  return memory[memory.length - 1];
}

// optimized lol
const partTwo = () => {
  const memory = {}

  const addToMemory = (number, index) => {
    const value = memory[number] ?? []

    value.length >= 2 ? value.shift() : null
    value.push(index + 1)
    
    memory[number] = value
  }

  input.map((value, i) => addToMemory(value, i))

  let lastNumberSpoken = input.slice(-1)[0]

  for (let i = input.length; i < 30000000; i++) {
    // console.log('i', i)
    const value = memory[lastNumberSpoken]
    lastNumberSpoken = value.length === 1
      ? 0
      : value.reduce((a, b) => b - a, 0)
    
    addToMemory(lastNumberSpoken, i)
  }
  return lastNumberSpoken
}

console.log('part one:', partOne())
console.log('part two:', partTwo())