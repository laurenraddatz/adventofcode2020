import { readFileSync } from 'fs' 

const input = readFileSync('src/dec06/input').toString()
const data = input.split('\n\n')

const sumCustomForms = (input) => {
  let sum = 0
  data.map((messyLine) => {
    const line = messyLine.replace(/\n/g, '')
    const unique = line.split('').filter((value, i, arr) => arr.indexOf(value) === i).join('')
    sum += unique.length
  })
  return sum
}

const sumCustomForms2 = (input) => {
  let sum = 0
  data.map((messyLine) => {
    const people = messyLine.split('\n')
    let lookup = {}
    people.map((p) => {
      for (let char of p) {
        if (!lookup[char]) lookup[char] = 0
        lookup[char]++
      }
    })
    let total = Object.entries(lookup).filter(([_, value]) => value === people.length)
    sum += total.length
  })
  return sum
}

console.log('part one:', sumCustomForms(data))
console.log('part two:', sumCustomForms2(data))