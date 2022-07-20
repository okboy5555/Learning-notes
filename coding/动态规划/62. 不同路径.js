// https://leetcode.cn/problems/unique-paths/solution/bu-tong-lu-jing-by-leetcode-solution-hzjf/
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 1、动态规划
 var uniquePaths = function (m, n) {
  const dp = new Array(m).fill(0).map(x => new Array(n).fill(0));
  for(let i=0;i<m;i++) {
    dp[i][0] = 1;
  }
  for(let j=0;j<n;j++) {
    dp[0][j] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

console.log(uniquePaths(3, 7));

// 时间复杂度O(m*n)
// 空间复杂度O(m*n)

// 2、组合数学
// 从左上角到右下角的过程中，我们需要移动 m+n-2m+n−2 次，其中有 m-1m−1 次向下移动，n-1n−1 次向右移动。
// 因此路径的总数，就等于从 m+n-2m+n−2 次移动中选择 m-1m−1 次向下移动的方案数
// 即计算C(m+n-2, m-1)
var uniquePaths2 = function(m, n) {
  let ans = 1;
  for (let x = n, y = 1; y < m; ++x, ++y) {
      ans = Math.floor(ans * x / y);
  }
  return ans;
};

// 时间复杂度O(m)
// 空间复杂度O(1)