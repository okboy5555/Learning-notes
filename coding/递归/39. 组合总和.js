// https://leetcode.cn/problems/combination-sum/
// 搜索回溯
var combinationSum = function (candidates, target) {
  let ans = [];
  const dfs = (target, combine, idx) => {
     if (idx === candidates.length) {
          return;
      }
      if (target === 0) {
          ans.push(combine);
          return;
      }
      // 直接跳过
      dfs(target, combine, idx + 1);
      // 选择当前数
      if (target - candidates[idx] >= 0) {
          dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
      }
  }
  dfs(target, [], 0);
  return ans;
};
// 输入: candidates = [2,3,5], target = 8
// 输出: [[2,2,2,2],[2,3,3],[3,5]]

// 时间复杂度：O(S)，其中 S 为所有可行解的长度之和
// 空间复杂度：O(target)。除答案数组外，空间复杂度取决于递归的栈深度，在最差情况下需要递归 O(target) 层。
