const sliceArray = function (arr) {
  if (arr.length < 2) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = sliceArray(arr.slice(0, mid))
  let right = sliceArray(arr.slice(mid, arr.length));
  return mergin(left, right);
}

const mergin = function (l1, l2) {
  let temp = []
  while(l1.length && l2.length) {
      const n1 = l1.shift()
      const n2 = l2.shift()
      if (n1 > n2) {
          temp.push(n2)
          l1.unshift(n1)
      } else {
          temp.push(n1)
          l2.unshift(n2)
      }
  }
  return [...temp, ...l1, ...l2]
}
console.log(sliceArray([4, 3, 2, 1, 5]))