/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;
  var leftAndRight = function (left, right) {
      if (!left && !right) return true;
      if (!left || !right) return false;
      if (left.val != right.val) return false;
      return leftAndRight(left.left, right.right) && leftAndRight(left.right, right.left);
  }
  return leftAndRight(root.left, root.right);
};

// @lc code=end

