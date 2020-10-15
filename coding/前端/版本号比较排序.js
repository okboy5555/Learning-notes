// 大数加权
const maxLen = Math.max(
  ...arr.map((item) => item.split('.').length)
)
const reducer = (acc, value, index) =>
  acc + (+value) * Math.pow(p, maxLen - index - 1)

const gen = (arr) =>
  arr.split('.').reduce(reducer, 0)

arr.sort((a, b) => gen(a) > gen(b) ? -1 : 1)


// 循环比较
arr.sort((a, b) => {
  let i = 0
  const arr1 = a.split('.')
  const arr2 = b.split('.')

  while (true) {
    const s1 = arr1[i]
    const s2 = arr2[i++]

    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length
    }

    if (s1 === s2) continue

    return s2 - s1
  }
})