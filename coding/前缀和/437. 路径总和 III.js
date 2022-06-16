// https://leetcode.cn/problems/path-sum-iii/

// 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

// 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

// 解法一：
var pathSum = function (root, targetSum) {
  if (!root) return 0;
  let ret = rootSum(root, targetSum)
  ret = ret + pathSum(root.left, targetSum)
  ret = ret + pathSum(root.right, targetSum)
  return ret;
};

var rootSum = function (root, targetSum) {
  let ret = 0;
  if (!root) return 0;
  let val = root.val;
  if (val === targetSum) {
    ret++;
  }
  ret = ret + rootSum(root.left, targetSum - val);
  ret = ret + rootSum(root.right, targetSum - val);
  return ret;
}

// 复杂度分析
// 时间复杂度：O(N^2) 
// 空间复杂度：O(N)，考虑到递归需要在栈上开辟空间。

// 解法二:
// 前缀和
var pathSum = function(root, targetSum) {
  const prefix = new Map();
  prefix.set(0, 1);
  return dfs(root, prefix, 0, targetSum);
}

const dfs = (root, prefix, curr, targetSum) => {
  if (root == null) {
      return 0;
  }

  let ret = 0;
  curr += root.val;

  ret = prefix.get(curr - targetSum) || 0;
  prefix.set(curr, (prefix.get(curr) || 0) + 1);
  ret += dfs(root.left, prefix, curr, targetSum);
  ret += dfs(root.right, prefix, curr, targetSum);
  prefix.set(curr, (prefix.get(curr) || 0) - 1);

  return ret;
}

// 时间复杂度：O(N) 
// 空间复杂度：O(N)