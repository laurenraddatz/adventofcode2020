import { readFileSync } from 'fs' 

const input = readFileSync('src/dec13/input').toString()

const partOne = () => {
  const [earliestTimestamp, buses] = input.split('\n')
  const busList = buses
    .split(',')
    .filter((bus) => bus !== 'x')
    .map((bus) => parseInt(bus))

  let time = earliestTimestamp
  let bus = 0
  while (true) {
    const results = busList.filter((bus) => time % bus === 0)
    if (results.length) {
      bus = results[0]
      break
    } else {
      time++
    }
  }
  return (time - earliestTimestamp) * bus
}

const partTwo = () => {
  const [_, buses] = input.split('\n')
  const busList = buses
    .split(',')

  const ts = busList.map((bus, index) => bus === 'x' ? null : index).filter((bus)=> bus !== null)
  const bs = busList.filter((bus) => bus !== 'x').map((bus) => parseInt(bus))

  ts.map((t, index) => {
    // just plug it into wolfram alpha lmao 
    console.log(`(t + ${t}) mod ${bs[index]} = 0, `)
  })
  // while (true) {
  //   const ts = busList.map((bus, index) => t + index)
  //   const result = busList.every((bus, index) => {
  //     if (bus === 'x') {
  //       return true
  //     } else {
  //       // console.log('t', t, 'bus', bus, ts[index])
  //       return parseInt(bus) % ts[index] === 0
  //     }
  //   })
  //   if (!result) {
  //     t += initialt
  //   } else {
  //     break
  //   }
  // }
}

console.log('part one:', partOne())
console.log('part two:', partTwo())