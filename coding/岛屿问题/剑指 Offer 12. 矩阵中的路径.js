// https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function (board, word, index) {
  const dfs = (i, j, index) => {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== word[index]) {
      return false;
    }
    if (index === word.length - 1) return true;
    const temp = board[i][j];
    board[i][j] = '';
    const res = dfs(i - 1, j, index + 1) ||
      dfs(i + 1, j, index + 1) ||
      dfs(i, j - 1, index + 1) ||
      dfs(i, j + 1, index + 1);
    board[i][j] = temp;
    return res;
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if(dfs(i, j, 0)) return true;
    }
  }
  return false;
};

console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], 'ABCCED')); // true
