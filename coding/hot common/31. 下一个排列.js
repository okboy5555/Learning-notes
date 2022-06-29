// https://leetcode.cn/problems/next-permutation/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var nextPermutation = function (nums) {
  let index = nums.length - 2;
  while (index >= 0 && nums[index] >= nums[index + 1]) {
    index--;
  }
  if (index >= 0) {
    for (let i = nums.length - 1; i > index; i--) {
      if (nums[i] > nums[index]) {
        [nums[i], nums[index]] = [nums[index], nums[i]];
        break;
      }
    }
  }
  let left = index + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  console.log(nums)
};
nextPermutation([5, 1, 1])

// nextPermutation([3, 2, 1])
// nextPermutation([1, 2])
// nextPermutation([1, 5, 2, 4, 3, 2])
// 1 5 (2) 4 3 2

// 时间复杂度O(n)
// 空间复杂度O(1)