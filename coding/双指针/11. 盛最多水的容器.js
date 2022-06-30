// https://leetcode.cn/problems/container-with-most-water/
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

var maxArea = function (height) {
  let l = 0;
  let r = height.length - 1;
  let area = (r - l) * Math.min(height[r], height[l]);
  while (l < r) {
    if(height[l] > height[r]) {
      r--;
    }else {
      l++;
    }
   area = Math.max(area, (r - l) * Math.min(height[r], height[l]));
  }
  return area;
};

// 时间复杂度O(n)  空间复杂度O(1)