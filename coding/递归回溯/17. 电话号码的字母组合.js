// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
  const result = [];
  if (digits.length === 0) return result;
  const dfs = (arr, index) => {
    if (index === digits.length) {
      result.push(arr.join(''));
      return;
    }
    const str = map[digits[index]];
    for (let i = 0; i < str.length; i++) {
      arr.push(str[i]);
      dfs(arr, index + 1);
      arr.pop();
    }
  }
  dfs([], 0);
  return result;
};

console.log(letterCombinations("23"));

// 时间复杂度 O(3^m *4^n)  m为3个字母的数字个数 n为4个字母的数字个数
// 空间复杂度 O(m+n)