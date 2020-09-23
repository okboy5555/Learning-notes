/*
 * @lc app=leetcode.cn id=404 lang=javascript
 *
 * [404] 左叶子之和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  let arr = []
  var dfs = function (root) {
      if (!root) return
      if (root.left && !root.left.left && !root.left.right) {
          arr.push(root.left.val)
      }
      dfs(root.left)
      dfs(root.right)
  }
  dfs(root)
  let res = arr.reduce((acc,cur) => acc+cur,0)
  return res
};
// @lc code=end

