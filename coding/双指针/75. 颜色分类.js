// https://leetcode.cn/problems/sort-colors/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var sortColors = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  for (let i = 0; i <= right; i++) {
    if (nums[i] === 0) {
      [nums[i], nums[left]] = [nums[left], nums[i]];
      left++;
    } else if (nums[i] === 2) {
      [nums[i], nums[right]] = [nums[right], nums[i]];
      right--;
      // 交换之后可能当前位置是0，所以要保持i不变
      i--;
    }
  }
  console.log(nums);
};

// console.log(sortColors([2, 0, 2, 1, 1, 0]))
console.log(sortColors([1, 0, 1]))

// [0,0,1,1,2,2]