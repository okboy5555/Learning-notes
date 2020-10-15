function flatDeep(arr) {
  return arr.reduce(
    (acc, curr) => (Array.isArray(curr) ? acc.concat(flatDeep(curr)) : acc.concat(curr)),
    []
  )
}
let a = [1, 2, 3, [4, 5, 6, [7, 8], 9], 10]
console.log(flatDeep(a))