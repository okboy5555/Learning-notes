/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max = nums[0];
  let min = nums[0];
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    let temp = max;
    max = Math.max(nums[i], Math.max(nums[i] * max, nums[i] * min));
    min = Math.min(nums[i], Math.min(nums[i] * temp, nums[i] * min));
    res = Math.max(res, max);
  }
  return res;
};