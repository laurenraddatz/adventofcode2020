import { readFileSync } from 'fs' 

const input = readFileSync('src/dec03/input.txt').toString()
const data = input.split('\n')

const countHowManyTreesYouHit = (treeMap) => {
  const extendedTreeMap = []
  treeMap.map((line) => {
    // choose a randomly large number
    const longerLine = line.repeat(100)
    extendedTreeMap.push(longerLine)
  })

  let index1 = 0
  let treeCount1 = 0
  extendedTreeMap.map((line) => {
    line[index1] === '#' ? treeCount1++ : undefined
    index1 += 1
  })

  let index2 = 0
  let treeCount2 = 0
  extendedTreeMap.map((line) => {
    line[index2] === '#' ? treeCount2++ : undefined
    index2 += 3
  })

  let index3 = 0
  let treeCount3 = 0
  extendedTreeMap.map((line) => {
    line[index3] === '#' ? treeCount3++ : undefined
    index3 += 5
  })

  let index4 = 0
  let treeCount4 = 0
  extendedTreeMap.map((line) => {
    line[index4] === '#' ? treeCount4++ : undefined
    index4 += 7
  })

  let index5 = 0
  let treeCount5 = 0
  extendedTreeMap.map((line, i) => {
    // even indices only
    if (i % 2 === 0) {
      line[index5] === '#' ? treeCount5++ : undefined
      index5 += 1
    }
  })

  console.log('part one ', treeCount2)
  console.log('part two ', treeCount1 * treeCount2 * treeCount3 * treeCount4 * treeCount5)
}

countHowManyTreesYouHit(data)