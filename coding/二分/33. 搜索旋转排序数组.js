// 整数数组 nums 按升序排列，数组中的值 互不相同 。

// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

//  

// 示例 1：

// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4
// 示例 2：

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function (nums, target) {
  let lowIndex = 0;
  let highIndex = nums.length - 1;
  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    if (nums[midIndex] === target) {
      return midIndex;
    }
    // 左边为单调增区间
    if (nums[lowIndex] <= nums[midIndex]) {
      if (target < nums[midIndex] && target >= nums[lowIndex]) {
        // 左边找到了
        highIndex = midIndex - 1;
      } else {
        // 左边找到了，应该到左边找
        lowIndex = midIndex + 1;
      }
    } else {
      // 右边为单调增区间
      if (target > nums[midIndex] && target <= nums[highIndex]) {
        // 右边找到了，应该到右边找
        lowIndex = midIndex + 1;
      } else {
        // 右边没找到，应该到左边找
        highIndex = midIndex - 1;
      }
    }
  }
  return -1;
};

console.log(search([3, 1], 1))
