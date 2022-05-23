function BinarySearch(arr, target) {
  if (arr.length <= 1) return -1
  // 低位下标
  let lowIndex = 0
  // 高位下标
  let highIndex = arr.length - 1

  while (lowIndex <= highIndex) {
      // 中间下标
      const midIndex = Math.floor((lowIndex + highIndex) / 2)
      if (target < arr[midIndex]) {
          highIndex = midIndex - 1
      } else if (target > arr[midIndex]) {
          lowIndex = midIndex + 1
      } else {
          // target === arr[midIndex]
          return midIndex
      }
  }
  return -1
}

// 时间复杂度logn