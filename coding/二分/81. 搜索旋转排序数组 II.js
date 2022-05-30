// 33. 搜索旋转排序数组 中差不多，就是有重复数字的处理
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  let lowIndex = 0;
  let highIndex = nums.length - 1;
  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    if (nums[midIndex] === target || nums[lowIndex] === target || nums[highIndex] === target) {
      return true;
    }
    // 左边为单调增区间
    if (nums[lowIndex] < nums[midIndex]) {
      if (target < nums[midIndex] && target >= nums[lowIndex]) {
        // 左边找到了
        highIndex = midIndex - 1;
      } else {
        // 左边没找到了，应该到右边找
        lowIndex = midIndex + 1;
      }
    } else if (nums[lowIndex] > nums[midIndex]) {
      // 右边为单调增区间
      if (target > nums[midIndex] && target <= nums[highIndex]) {
        // 右边找到了，应该到右边找
        lowIndex = midIndex + 1;
      } else {
        // 右边没找到，应该到左边找
        highIndex = midIndex - 1;
      }
    } else {
      lowIndex = lowIndex + 1;
    }
  }
  return false;
};
console.log(search([1, 0, 1, 1, 1], 0));