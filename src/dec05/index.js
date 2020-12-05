import { readFileSync } from 'fs' 

const input = readFileSync('src/dec05/input').toString()
const data = input.split('\n')

const getSeatIds = (input) => {
  const allSeatIds = []
  input.map((line) => {
    let rowMax = 127
    let rowMin = 0
    let columnMax = 7
    let columnMin = 0
    const rowString = line.substring(0, 7).split('')
    const columnString = line.substring(7, 10).split('')

    rowString.map((value) => {
      if (value === 'F') {
        rowMax = Math.floor((rowMax + rowMin) / 2)
      } else if (value === 'B') {
        rowMin = Math.ceil((rowMax + rowMin) / 2)
      }
    })
    const row = rowMax

    columnString.map((value) => {
      if (value === 'L') {
        columnMax = Math.floor((columnMax + columnMin) / 2)
      } else if (value === 'R') {
        columnMin = Math.ceil((columnMax + columnMin) / 2)
      }
    })
    const column = columnMax
    const seatID = row * 8 + column
    allSeatIds.push(seatID)
  })
  return allSeatIds
}

const getHighestSeatId = (input) => {
  const all = getSeatIds(input)
  return Math.max(...all)
}

const getYourSeatId = (input) => {
  const all = getSeatIds(input)
  return all.sort((a, b) => a - b).reduce((acc, cur, index, array) => {
    const diff = cur - array[index - 1]
    if (diff > 1) {
      let i = 1
      while (i < diff) {
        acc.push(array[index - 1] + i)
        i++
      }
    }
    return acc;
  }, [])
}

console.log('part one:', getHighestSeatId(data))
console.log('part two:', getYourSeatId(data)[0])