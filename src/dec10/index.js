import { readFileSync } from 'fs' 
import { parse } from 'path'

const input = readFileSync('src/dec10/input').toString()
const data = input.split('\n')

const partOne = (data) => {
  let oneJolt = 1
  let threeJolt = 1
  const jolts = data.map((a) => parseInt(a)).sort((a, b) => a - b)

  for (let i = 0; i < jolts.length - 1; i++) {
    const diff = jolts[i + 1] - jolts[i]
    diff === 1 ? oneJolt++ : threeJolt++
  }
  
  return oneJolt * threeJolt
}

const partTwo = (data) => {
  const jolts = data.map((a) => parseInt(a)).sort((a, b) => b - a)
  jolts.unshift(jolts[0] + 3)
  jolts.push(0)

  let numRoutes = {}
  jolts.map((jolt) => numRoutes[jolt] = 0)

  numRoutes[jolts[0]] = 1

  jolts.map((jolt) => {
    const jumps = jolts.filter((jump) => jump > jolt && jump - jolt <= 3)
    numRoutes[jolt] += jumps.reduce((acc, jump) => acc + numRoutes[jump], 0)
  })

  return numRoutes[0]
}


console.log('part one:', partOne(data))
console.log('part two:', partTwo(data))