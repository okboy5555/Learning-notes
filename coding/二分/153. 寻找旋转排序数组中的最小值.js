/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMin = function (nums) {
  let lowIndex = 0;
  let highIndex = nums.length - 1;
  while (lowIndex < highIndex) {
      const midIndex = Math.floor((lowIndex + highIndex) / 2)
      if (nums[midIndex] > nums[highIndex]) {
          lowIndex = midIndex + 1
      } else {
          highIndex = midIndex
      }
  }
  return nums[lowIndex];
};