// https://leetcode.cn/problems/maximum-subarray/submissions/
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function (nums) {
  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
  }
  return Math.max(...dp);
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));


// 降维
var maxSubArray = function (nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};
