import { readFileSync } from 'fs' 

const input = readFileSync('src/dec08/input').toString()
const data = input.split('\n')

const runProgram = (data) => {
  const linesVisited = []
  let index = 0
  let acc = 0
  while (index < data.length) {
    const [operation, value] = data[index].split(' ')

    if (!linesVisited.includes(index)) {
      linesVisited.push(index)
      if (operation === 'nop') {
        index++
      } else if (operation === 'acc') {
        acc += parseInt(value)
        index++
      } else if (operation === 'jmp') {
        index += parseInt(value)
      }
    } else {
      break
    }
  }
  return acc
}

const runProgram2 = (data) => {
  const newData = data.map((line) => {
    const [operation, value] = line.split(' ')
    return [operation, value]
  })

  for (let i = 0; i < newData.length; i++) {
    const linesVisited = []
    let index = 0
    let acc = 0
    // const fixed = [...newData]
    // this took me so long to catch smh
    const fixed = newData.map(([operation, value]) => [operation, value]);

    if (newData[i][0] === 'jmp') {
      fixed[i][0] = 'nop'
    } else if (newData[i][0] === 'nop') {
      fixed[i][0] = 'jmp'
    } else { continue }

    while (!linesVisited.includes(index)) {
      const [operation, value] = fixed[index]

      linesVisited.push(index)
      if (operation === 'nop') {
        index++
      } else if (operation === 'acc') {
        acc += parseInt(value)
        index++
      } else if (operation === 'jmp') {
        index += parseInt(value)
      }
      if (index >= fixed.length) {
        return acc
      }
    }
  }
}

console.log('part one:', runProgram(data))
console.log('part two:', runProgram2(data))