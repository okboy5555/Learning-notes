const binarySearch = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let ans = nums.length;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }
  return ans - 1;
}
const binarySearch2 = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let ans = nums.length;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }
  return ans;
}
var searchRange = function (nums, target) {
  const left = binarySearch2(nums, target);
  const right = binarySearch(nums, target);
  if (left <= right) {
    return [left, right];
  }
  return [-1, -1];
};

// console.log(searchRange([5, 7, 7, 8, 8, 10], 8)) [3,4]
// console.log(searchRange([5, 7, 7, 8, 8, 10], 6)) [-1,-1]
console.log(searchRange([1], 0))

// 时间复杂度O(logn)
// 空间复杂度O(1)