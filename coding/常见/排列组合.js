// 排列 A(n,k)
const queue = (arr, size) => {
  if (size > arr.length) { return; }
  let allResult = [];
  const dfs = (arr, size, result) => {
    if (result.length === size) {
      allResult.push(result);
    } else {
      for (let i = 0, len = arr.length; i < len; i++) {
        const newResult = [...result, arr[i]];
        const newArr = [...arr];
        newArr.splice(i, 1);
        dfs(newArr, size, newResult);
      }
    }
  }
  dfs(arr, size, []);
  return allResult;
}

console.log(queue([1, 2, 3, 4], 3))

// 组合 C(n, k)
const choose = (arr, size) => {
  if (size > arr.length) { return; }
  let allResult = [];
  const dfs = (arr, size, result) => {
    if (result.length === size) {
      allResult.push(result);
    } else {
      for (let i = 0, len = arr.length; i < len; i++) {
        const newResult = [...result, arr[i]];
        const newArr = [...arr];
        // 这一行不同
        newArr.splice(0, i+1);
        dfs(newArr, size, newResult);
      }
    }
  }
  dfs(arr, size, []);
  return allResult;
}
console.log(choose([1, 2, 3, 4, 5], 3))