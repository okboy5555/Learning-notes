var pathSum = function (root, sum) {
  let res = [];
  let dfs = function (root, sum, path) {
      if (root) {
          path.push(root.val)
          if (root.val !== sum && !root.left && !root.right) return;
          if (root.val === sum && !root.left && !root.right) res.push([...path])
          if (root.left) {
              dfs(root.left, sum - root.val, path)
              path.pop();
          }
          if (root.right) {
              dfs(root.right, sum - root.val, path)
              path.pop();
          }
      }
  }
  dfs(root, sum, []);
  return res;
}


// https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/