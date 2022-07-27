// https://leetcode.cn/problems/word-search/
var exist = function (board, word) {
  const dfs = (i, j, index, temp) => {
    if (i >= board.length || j >= board[0].length || i < 0 || j < 0 && board[i][j]) return false;
    if (temp === word) return true;
    if (board[i][j] !== word[index]) return false;
    if (board[i][j] === word[index]) {
      let temp2 = temp + board[i][j];
      board[i][j] = "";
      if (dfs(i + 1, j, index + 1, temp2) || dfs(i - 1, j, index + 1, temp2) || dfs(i, j + 1, index + 1, temp2) || dfs(i, j - 1, index + 1, temp2)) {
        return true;
      }
      board[i][j] = word[index];
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (dfs(i, j, 0, '')) return true;
    }
  }
  return false;
};

// 时间复杂度 O(MN * 3^L)  M N 为网格的长宽 L为字符串word长度
// 空间复杂度 O(1) 未使用额外空间