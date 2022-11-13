// https://leetcode.cn/problems/longest-consecutive-sequence/
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  let max = 0;
  for (let value of set) {
    // 寻找左邻居,如果没有左邻居，现在就是序列起点
    if (!set.has(value - 1)) {
      let length = 1;
      let cur = value;
      while(set.has(cur+1)) {
        length++;
        cur++;
      }
      max = Math.max(max,length)
    }
  }
  return max;
};

// 时间复杂度O(n)
// 空间复杂度O(n)