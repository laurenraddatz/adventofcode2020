import { readFileSync } from 'fs' 

const input = readFileSync('src/dec04/input.txt').toString()
const data = input.split('\n\n')

const countValidPassports1 = (input) => {
  let count = 0
  input.map((line) => {
    if (line.includes('byr') && line.includes('iyr') && line.includes('eyr') && line.includes('hgt') && line.includes('hcl') && line.includes('ecl') && line.includes('pid')) {
      count++
    }
  })
  return count
}

const isByr = (byr) => byr >= 1920 && byr <= 2002
const isIyr = (iyr) => iyr >= 2010 && iyr <= 2020
const isEyr = (eyr) => eyr >= 2020 && eyr <= 2030
const isHgt = (hgt) => {
  if (hgt.includes('cm')) {
    return parseInt(hgt.split('cm')[0]) >= 150 && parseInt(hgt.split('cm')[0]) <= 193
  } else if (hgt.includes('in')) {
    return parseInt(hgt.split('in')[0]) >= 59 && parseInt(hgt.split('in')[0]) <= 76
  } else return false
}
const isHcl = (hcl) => RegExp('#([0-9]|[a-f]){6}').test(hcl)
const isEcl = (ecl) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl) 
const isPid = (pid) => pid.length === 9

const countValidPassports2 = (input) => {
  let count = 0

  input.map((messyLine) => {
    if (messyLine.includes('byr') && messyLine.includes('iyr') && messyLine.includes('eyr') && messyLine.includes('hgt') && messyLine.includes('hcl') && messyLine.includes('ecl') && messyLine.includes('pid')) {
      const line = messyLine.replace(/\n/g, ' ').split(' ')
      const byr = parseInt(line.find(a => a.includes('byr')).split(':')[1])
      const iyr = parseInt(line.find(a => a.includes('iyr')).split(':')[1])
      const eyr = parseInt(line.find(a => a.includes('eyr')).split(':')[1])
      const hgt = line.find(a => a.includes('hgt')).split(':')[1]
      const hcl = line.find(a => a.includes('hcl')).split(':')[1]
      const ecl = line.find(a => a.includes('ecl')).split(':')[1]
      const pid = line.find(a => a.includes('pid')).split(':')[1]
      
      if (isByr(byr) && isIyr(iyr) && isEyr(eyr) && isHgt(hgt) && isHcl(hcl) && isEcl(ecl) && isPid(pid)) {
        count++
      }
    }
  })
  return count
}

console.log('part one:', countValidPassports1(data))
console.log('part two:', countValidPassports2(data))