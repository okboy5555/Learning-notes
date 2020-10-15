let arr = [1, 2, 3]

function allSubsets(a) {
  let res = [[]]

  for (let i = 0; i < a.length; i++) {
    const tempRes = res.map(subset => {
      const item = subset.concat([])
      item.push(a[i])
      return item
    })
    res = res.concat(tempRes)
  }

  return res
}

console.log(allSubsets(arr));