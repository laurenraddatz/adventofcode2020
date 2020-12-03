import { readFileSync } from 'fs' 

const input = readFileSync('src/dec03/input.txt').toString()
const data = input.split('\n')

const countHowManyTreesYouHit = (treeMap) => {
  // increase by an arbitrarily large number
  const extendedTreeMap = treeMap.map((line) => line.repeat(100))

  const getTreeCount = (dx, dy) => {
    let index = 0
    let treeCount = 0
    extendedTreeMap.map((line, i) => {
      if (i % dy === 0) {
        line[index] === '#' ? treeCount++ : undefined
        index += dx
      }
    })
    return treeCount
  }

  console.log('part one ', getTreeCount(3, 1))
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
  console.log('part two ', slopes.reduce((acc, slope) => acc * getTreeCount(slope[0], slope[1]), 1))
}

countHowManyTreesYouHit(data)