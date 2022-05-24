// 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

//  

// 示例 1：

// 输入：nums = [1,1,1], k = 2
// 输出：2
// 示例 2：

// 输入：nums = [1,2,3], k = 3
// 输出：2

var subarraySum = function (nums, k) {
  const map = { 0: 1 };
  let prefixSum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    if (map[prefixSum - k]) {
      count += map[prefixSum - k];
    }
    map[prefixSum] = (map[prefixSum] || 0) + 1;
  }
  return count;
};