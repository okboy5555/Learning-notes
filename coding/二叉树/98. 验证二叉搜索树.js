// https://leetcode.cn/problems/validate-binary-search-tree/
var isValidBST = function(root) {
  const dfs=(node, lower, upper) => {
      if(!node) return true
      if(node.val <= lower || node.val >= upper) return false
      let left = dfs(node.left, lower, node.val)
      let right = dfs(node.right, node.val, upper)
      return left && right
  }
  return dfs(root, -Infinity, Infinity)
};

// 时间复杂度O(n)
// 空间复杂度O(n)