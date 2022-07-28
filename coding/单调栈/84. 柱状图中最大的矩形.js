// https://leetcode.cn/problems/largest-rectangle-in-histogram/solution/84-zhu-zhuang-tu-zhong-zui-da-de-ju-xing-r15e/
const largestRectangleArea = (heights) => {
  let maxArea = 0
  const stack = [] //单调递增栈 注意栈存的时下标
  heights = [0, ...heights, 0]    //在heights数组前后增加两个哨兵 用来清零单调递增栈里的元素   
  for (let i = 0; i < heights.length; i++) {
      //当前元素对应的高度小于栈顶元素对应的高度时
      while (heights[i] < heights[stack[stack.length - 1]]) {
          const stackTopIndex = stack.pop() //出栈
          maxArea = Math.max(               //计算面积 并更新最大面积
              maxArea,
              heights[stackTopIndex] * (i - stack[stack.length - 1] - 1)//高乘宽
          )
      }
      stack.push(i)//当前下标加入栈
  }
  return maxArea
}

