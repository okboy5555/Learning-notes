// https://leetcode.cn/problems/unique-binary-search-trees/solution/bu-tong-de-er-cha-sou-suo-shu-by-leetcode-solution/

// 1、动态规划
var numTrees = function(n) {
  const G = new Array(n + 1).fill(0);
  G[0] = 1;
  G[1] = 1;

  for (let i = 2; i <= n; ++i) {
      for (let j = 1; j <= i; ++j) {
          G[i] += G[j - 1] * G[i - j];
      }
  }
  return G[n];
};

// 时间复杂度O(n^2)
// 空间复杂度O(n)