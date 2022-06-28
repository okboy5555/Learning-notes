// https://leetcode.cn/problems/generate-parentheses/
/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function (n) {
  let result = [];
  const dfs = (temp, L, R) => {
    if (temp.length === 2 * n) {
      result.push(temp);
      return
    }
    if (L > 0) {
      dfs(temp + "(", L - 1, R);
    }
    if (L < R) {
      dfs(temp + ")", L, R - 1);
    }
  }
  dfs('', n, n);
  return result
};
console.log(generateParenthesis(3)); // ["((()))","(()())","(())()","()(())","()()()"]