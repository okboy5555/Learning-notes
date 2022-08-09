// https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/solution/er-cha-shu-zhan-kai-wei-lian-biao-by-leetcode-solu/
// 1、前序遍历和展开同步进行
var flatten = function(root) {
  if (root === null) {
      return;
  }
  const stack = [];
  stack.push(root);
  let prev = null;
  while (stack.length) {
      const curr = stack.pop();
      if (prev !== null) {
          prev.left = null;
          prev.right = curr;
      }
      const left = curr.left, right = curr.right;
      if (right !== null) {
          stack.push(right);
      }
      if (left !== null) {
          stack.push(left);
      }
      prev = curr;
  }
};
// 时间复杂度O(n)
// 空间复杂度O(n)

// 2、寻找前驱节点
var flatten = function(root) {
  let curr = root;
  while (curr !== null) {
      if (curr.left !== null) {
          const next = curr.left;
          let predecessor = next;
          while (predecessor.right !== null) {
              predecessor = predecessor.right;
          }
          predecessor.right = curr.right;
          curr.left = null;
          curr.right = next;
      }
      curr = curr.right;
  }
};

// 时间复杂度O(n)
// 空间复杂度O(1)