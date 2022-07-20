// https://leetcode.cn/problems/minimum-path-sum/
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var minPathSum = function (grid) {
  let dp = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(0));
  dp[0][0] = grid[0][0];
  for (let i = 1; i < grid.length; i++) {
    dp[i][0] = grid[i][0] + dp[i - 1][0];
  }
  for (let j = 1; j < grid[0].length; j++) {
    dp[0][j] = grid[0][j] + dp[0][j - 1];
  }
  for (let i = 1; i < grid.length; i++) {
    for (let j = 1; j < grid[0].length; j++) {
      dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[grid.length - 1][grid[0].length - 1];
};

console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]))
// console.log(minPathSum([[1, 2, 3], [4, 5, 6]]))

// 时间复杂度O(m*n)
// 空间复杂度O(m*n)