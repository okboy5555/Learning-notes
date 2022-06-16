// https://leetcode.cn/problems/jian-sheng-zi-lcof/
// 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），
// 每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 
// 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

/**
 * @param {number} n
 * @return {number}
 */
 var cuttingRope = function (n) {
  const dp = new Array(n+1).fill(1);
  let nowBigger = 0;
  for (let i = 1; i < n + 1; i++) {
    for (let j = 0; j < i; j++) {
      nowBigger = Math.max(j * (i - j), j * dp[i - j]);
      dp[i] = Math.max(nowBigger, dp[i]);
    }
  }
  return dp[n]
};