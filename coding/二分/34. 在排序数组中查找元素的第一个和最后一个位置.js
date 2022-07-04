/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var searchRange = function (nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) {
      // 如果相等
      let left = mid;
      let right = mid;
      while (left >= 0 && nums[left] === target) {
        left--;
      }
      while (right < nums.length && nums[right] === target) {
        right++;
      }
      return [left + 1, right - 1];
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return [-1, -1];
};

// console.log(searchRange([5, 7, 7, 8, 8, 10], 8)) [3,4]
// console.log(searchRange([5, 7, 7, 8, 8, 10], 6)) [-1,-1]
console.log(searchRange([1], 0))

// 时间复杂度O(logn)
// 空间复杂度O(1)