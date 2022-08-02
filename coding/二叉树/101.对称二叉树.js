// https://leetcode.cn/problems/symmetric-tree/
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isSymmetric = function (root) {
  const dfs = (root1, root2) => {
      // 节点都为null
      if (root1 == null && root2 == null) return true;
      // 只有一个节点为null，不对称
      if (root1 != null && root2 == null || root1 == null && root2 != null) return false;
      // 先序遍历查看节点值是否相等，不相等返回false，相等继续判断子树
      if (root1.val == root2.val) return dfs(root1.left, root2.right) && dfs(root1.right, root2.left);
      return false;
  }
  return dfs(root, root);
};

// 时间复杂度O(n)
// 空间复杂度O(n)