import { readFileSync } from 'fs' 

const input = readFileSync('src/dec14/input').toString()
const data = input.split('\n')

const partOne = () => {
  let mask = ''
  let memory = {}
  for (let line of data) {
    if (line.includes('mask')) {
      mask = line.split(' = ')[1]
      continue
    } else {
      const [location, value] = line.split(' = ')
      const address = parseInt(location.slice(4, -1))
      let binaryArray = parseInt(value).toString(2).split('')

      while (binaryArray.length < 36) {
        binaryArray.unshift('0')
      }

      const result = binaryArray.map((value, index) => {
        if (mask[index] === 'X') {
          return value
        } else {
          return mask[index]
        }
      })

      memory[address] = parseInt(result.join(''), 2)
    }
  }

  return Object.values(memory).reduce((sum, value) => sum + value) 
}

const partTwo = () => {
  let mask = ''
  let memory = {}
  let floats = []
  for (let line of data) {
    if (line.includes('mask')) {
      mask = line.split(' = ')[1]
      floats = [0]
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') {
          const alts2 = []
          for (let j of floats) {
            alts2.push(2 ** (36 - 1 - i) + j)
          }
          floats = floats.concat(alts2)
        }
      }
      continue
    } else {
      const [location, value] = line.split(' = ')
      const address = parseInt(location.slice(4, -1))
      const decimalValue = parseInt(value)
      let addressArray = parseInt(address).toString(2).split('')

      while (addressArray.length < 36) {
        addressArray.unshift('0')
      }

      const result = addressArray.map((address, index) => {
        if (mask[index] === '0') {
          return address
        } else if (mask[index] === '1') {
          return 1
        } else if (mask[index] === 'X') {
          return 0
        }
      })

      const decimalAddress = parseInt(result.join(''), 2)
      
      floats.map((alt) => {
        memory[decimalAddress + alt] = decimalValue
      })
    }
  }
  return Object.values(memory).reduce((sum, value) => sum + value) 
}

console.log('part one:', partOne())
console.log('part two:', partTwo())