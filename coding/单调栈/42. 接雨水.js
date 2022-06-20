// https://leetcode.cn/problems/trapping-rain-water/
/**
 * @param {number[]} height
 * @return {number}
 */
// 时间和算法复杂度都为O(n)
var trap = function(height) {
  let ans = 0;
  const stack = [];//单调递减栈。存放的是下标哦
  const n = height.length;
  for (let i = 0; i < n; ++i) {//循环heights
      //当前柱子的高度大于栈顶柱子的 不断出栈
      while (stack.length && height[i] > height[stack[stack.length - 1]]) {
          const top = stack.pop();
          if (!stack.length) {//栈为空时 跳出循环
              break;
          }
          const left = stack[stack.length - 1];//拿到当前位置左边比当前柱子矮的位置
          const currWidth = i - left - 1;//计算宽度
          const currHeight = Math.min(height[left], height[i]) - height[top];//计算高度
          ans += currWidth * currHeight;//计算当面积
      }
      stack.push(i);//加入栈
  }
  return ans;
};
