import { readFileSync } from 'fs' 

const input = readFileSync('src/dec12/input').toString()
const data = input.split('\n')

const partOne = (data) => {
  let x = 0
  let y = 0

  let degree = 90

  data.map((line) => {
    const direction = line[0]
    const value = parseInt(line.substring(1, line.length))

    switch (direction) {
      case 'N':
        y += value
        break
      case 'E':
        x += value
        break
      case 'S':
        y -= value
        break
      case 'W':
        x -= value
        break
      case 'L':
        degree -= value;
        if (degree < 0) {
          degree = 360 + degree;
        }
        break
      case 'R':
        degree += value;
        degree = Math.abs(degree) % 360;
        break
      case 'F':
        if (degree === 0) {
          y += value
        } else if (degree === 90) {
          x += value
        } else if (degree === 180) {
          y -= value
        } else if (degree === 270) {
          x -= value
        }
        break
    }
  })
  return Math.abs(x) + Math.abs(y)
}

const partTwo = (data) => {
  let x = 0
  let y = 0

  let wx = 10
  let wy = 1

  data.map((line) => {
    const direction = line[0]
    let value = parseInt(line.substring(1, line.length))

    switch (direction) {
      case 'N':
        wy += value
        break
      case 'E':
        wx += value
        break
      case 'S':
        wy -= value
        break
      case 'W':
        wx -= value
        break
      case 'L':
        while (value > 0) {
          const tmp = wy;
          wy = wx;
          wx = -tmp;
          value -= 90;
        }
        break
      case 'R':
        while (value > 0) {
          const tmp = wy;
          wy = -wx;
          wx = tmp;
          value -= 90;
        }
        break
      case 'F':
        x += wx * value
        y += wy * value
        break
    }

  })
  return Math.abs(x) + Math.abs(y)
}

console.log('part one:', partOne(data))
console.log('part two:', partTwo(data))