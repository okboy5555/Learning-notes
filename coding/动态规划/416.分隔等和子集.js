// https://leetcode.cn/problems/partition-equal-subset-sum/
// 可降维

var canPartition = function (nums) {
  const n = nums.length;
  if (n < 2) {
    return false;
  }
  let sum = nums.reduce((a, b) => a + b);
  let maxNum = Math.max(...nums);
  let target = 0;
  // 判断奇数
  if (sum % 2 !== 0) {
    return false;
  } else {
    // 偶数的情况
    target = sum / 2;
    if (maxNum > target) {
      return false;
    }
  }
  const dp = new Array(n).fill(0).map(v => new Array(target + 1).fill(false));
  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = true;
  }
  dp[0][nums[0]] = true;
  for (let i = 1; i < dp.length; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n - 1][target];
};