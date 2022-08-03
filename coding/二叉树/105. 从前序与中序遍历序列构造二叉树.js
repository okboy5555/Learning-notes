// https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

var buildTree = function (preorder, inorder) {
  if (inorder.length === 0) return null;
  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
};

// 时间复杂度O(n)
// 空间复杂度O(n)

// 思路

// 变量 pre 保存当前要构造的树的 root
// 变量 in 保存 inorder 数组中可以成为 root 的数字们的开头那个
// 对于当前要构造的树，有一个停止点 stop ，inorder 数组中第 in 项到第 stop 项是要构造的树的节点值们
// 每次递归调用，都会确定出一个停止点，它告诉了子调用在哪里停止，把自己的根节点值作为左子树调用的停止点，自己的（父调用给下来的）停止点作为右子树的停

var buildTree2 = function(preorder, inorder) {
  pre = i = 0
  build = function(stop) {
      if (inorder[i] != stop) {
          var root = new TreeNode(preorder[pre++])
          root.left = build(root.val)
          i++
          root.right = build(stop)
          return root
      }
      return null
  }
  return build()
};