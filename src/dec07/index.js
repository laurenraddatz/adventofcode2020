import { readFileSync } from 'fs' 

const input = readFileSync('src/dec07/input').toString()
const data = input.split('\n')


const rules = data.reduce((rules, line) => {
  const [color, otherColors] = line.split(' bags contain ')
  const contents = otherColors.replace('.', '')

  rules[color] = new Set()

  const bagRelation = contents !== 'no other bags'
    ? contents.split(', ').map((content) => content.replace(/ bags?/, '').substring(2))
    : [];

  bagRelation.map((bag) => rules[color].add(bag));

  return rules;
}, {});

const recurseBags = (bag) => {
  const colors = [...rules[bag].values()];

  [...rules[bag].values()].map((color) => colors.push(...recurseBags(color)))

  return colors;
};

console.log('part one:', Object.keys(rules).filter((key) => recurseBags(key).includes('shiny gold')).length)

const rulesWithCount = data.reduce((rules, line) => {
  const [color, otherColors] = line.split(' bags contain ')
  const contents = otherColors.replace('.', '')

  const bagRelation = contents !== 'no other bags'
    ? contents.split(', ').map((content) => {
      const bagColor = content.replace(/ bags?/, '').substring(2)
      const count = content.substring(0, 2)
      return { count: parseInt(count), bagColor }
    })
    : [];

  rules.set(color, [])

  bagRelation.map((bagColor) => rules.get(color).push(bagColor));

  return rules;
}, new Map());

const countNestedBags = (bag) => {
  let bagCount = 0
  
  for (const { bagColor, count} of rulesWithCount.get(bag)) {
    bagCount += count + count * countNestedBags(bagColor)
  }
  return bagCount
}

console.log('part two:', countNestedBags('shiny gold'))