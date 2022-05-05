// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function (root, p, q) {
  let ans;
  const dfs = (root, p, q) => {
      if (root === null) return false;
      const lson = dfs(root.left, p, q);
      const rson = dfs(root.right, p, q);
      if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
          ans = root;
      }
      return lson || rson || (root.val === p.val || root.val === q.val);
  }
  dfs(root, p, q);
  return ans;
};