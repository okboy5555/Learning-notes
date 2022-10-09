// https://leetcode.cn/problems/product-of-array-except-self/

var productExceptSelf = function (nums) {
  let L = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    L[i] = L[i - 1] * nums[i - 1];
  }
  let R = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    L[i] = L[i] * R;
    R = R * nums[i];
  }
  return L;
};

// 时间复杂度O(n)
// 空间复杂度O(1)

