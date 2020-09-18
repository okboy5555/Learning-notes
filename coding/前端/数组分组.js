function groupArray (data, cols) {
  return data
    .reduce(
      ([groups, subIndex], d) => {
        // subIndex 根据 cols 在 [0, cols) 区间循环，可通过取余来更新 subIndex
        // 所以，subIndex === 0 表示产生了一个新的分组
        if (subIndex === 0) {
          // 为了方便访问最后加入的分组，用 unshift 倒插
          // 这样后面就可以用 groups[0] 获取最新的分组
          groups.unshift([])
          // 当然这里用 push，后面用 groups[groups.length - 1] 也是可以的
        }

        // 将数据加入到最近的一个分组中
        groups[0].push(d)

        return [groups, (subIndex + 1) % cols]
      },
      [[], 0] // 初始值，groups = [], subIndex = 0
    )[0]        // reduce 的结果是 [groups, subIndex]，所以用 [0] 把 groups 取出来
    .reverse() // 前面 unshift 加的组，所以要反个向
}

function groupArray (data, cols) {
  const list = []
  let current = []

  // for (t of data) {
  data.forEach(t => {
    current.push(t)
    if (current.length === cols) {
      list.push(current)
      current = []
    }
  })
  // }    // for (t of data)

  if (current.length) {
    list.push(current)
  }
  return list
}
