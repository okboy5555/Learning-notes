/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数
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
 * @return {number[]}
 */
var findMode = function (root) {
  var res = {}, maxCount = 0, r = []
  let dfs = function(root) {
      if(!root) return
      if(root.left) dfs(root.left)
      if(root.right) dfs(root.right)
      res[root.val] = (res[root.val] || 0) + 1
      if (res[root.val] >= maxCount) {
          res[root.val] > maxCount && (r.length = 0)
          maxCount = res[root.val]
          r.push(root.val)
      }
  }
  dfs(root)
  return r
};
// @lc code=end

