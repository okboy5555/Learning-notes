// https://leetcode.cn/problems/merge-intervals/
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function (intervals) {
  if (intervals.length === 0) return [];
  if (intervals.length === 1) return [intervals[0]];
  let ans = [];
  intervals.sort((a, b) => a[0] - b[0]);
  let min = intervals[0][0];
  let max = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    // 判断分段
    if (intervals[i][0] > max) {
      ans.push([min, max]);
      min = intervals[i][0];
      max = intervals[i][1];
    } else {
      max = Math.max(intervals[i][1], max);
    }
  }
  ans.push([min, max]);
  return ans;
};

// merge([[1, 3], [2, 6], [8, 10], [15, 18]])
// merge([[1,4],[4,5]])
// console.log(merge([[1,3]]))
console.log(merge([[1, 4], [2, 3]]));

// 时间复杂度 O(nlogn)
// 空间复杂度 O(logn)