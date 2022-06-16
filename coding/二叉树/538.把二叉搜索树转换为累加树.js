/*
 * @lc app=leetcode.cn id=538 lang=javascript
 *
 * [538] 把二叉搜索树转换为累加树
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
 * @return {TreeNode}
 */
const convertBST = (root) => {
  let sum = 0;
  const inOrder = (root) => {
      if (root == null) { // 遍历到null节点，开始返回
          return;
      }
      if (root.right) {   // 先进入右子树
          inOrder(root.right);
      }
      sum += root.val;    // 节点值累加给sum
      root.val = sum;     // 累加的结果，赋给root.val
      if (root.left) {    // 然后才进入左子树
          inOrder(root.left);
      }
  };
  inOrder(root); // 递归的入口，从根节点开始
  return root;
}
// @lc code=end

