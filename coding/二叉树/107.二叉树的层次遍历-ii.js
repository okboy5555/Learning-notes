/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  let stack = []
  let result = []
  if (root) {
      stack.push(root)
  }
  while (stack.length !== 0) {
      let arr = []
      let len = stack.length
      for (let i = 0; i < len; i++) {
          let node = stack.shift()
          arr.push(node.val)
          if (node.left) {
              stack.push(node.left)
          }
          if (node.right) {
              stack.push(node.right)
          }
      }
      result.unshift(arr)
  }
  return result
};
// @lc code=end

