// https://leetcode.cn/problems/number-of-islands/
// 输入：grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// 输出：3


var numIslands = function (grid) {
  const dfs = (i, j) => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return;
    }
    grid[i][j] = '0';
    dfs(i - 1, j);
    dfs(i + 1, j);
    dfs(i, j - 1);
    dfs(i, j + 1);
  }
  let count = 0;
  for(let i=0; i<grid.length; i++) {
    for(let j=0;j<grid[0].length;j++) {
      if(grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
};

// 时间复杂度O(m*n)
// 空间复杂度O(m*n)