import { readFileSync } from 'fs' 

const input = readFileSync('src/dec02/input.txt').toString()
const data = input.split('\n')

const countValidPasswords1 = (policies) => {
  let count = 0
  policies.map((policy) => {
    const [rule, letterColon, password] = policy.split(' ')
    const [min, max] = rule.split('-')
    const letter = letterColon[0]
    const re = new RegExp(letter, 'g')
    const letterCount = password.includes(letter) ? password.match(re).length : -1
    if (letterCount >= min && letterCount <= max) {
      count++
    }
  })
  return count
}

const countValidPasswords2 = (policies) => {
  let count = 0
  policies.map((policy) => {
    const [rule, letterColon, password] = policy.split(' ')
    const letter = letterColon[0]
    const [firstIndex, secondIndex] = rule.split('-').map((n) => n - 1)
    if (password[firstIndex] === letter && password[secondIndex] !== letter ||
        password[secondIndex] === letter && password[firstIndex] !== letter) {
      count++
    }
  })
  return count
}

console.log('part one: ', countValidPasswords1(data))
console.log('part two: ', countValidPasswords2(data))