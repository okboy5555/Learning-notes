/**
 * @param {string} s
 * @return {number}
 */
 var longestValidParentheses = function (s) {
  let max = 0;
  let left = 0;
  let right = 0;
  // 寻找所有(开始)结束的字符串;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      left++;
    }
    if (s[i] === ')') {
      right++;
    }
    if (left < right) {
      left = 0;
      right = 0;
    }
    if (left === right && s[i] === ')') {
      max = Math.max(max, left + right);
    }
  }
  left = 0;
  right = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '(') {
      left++;
    }
    if (s[i] === ')') {
      right++;
    }
    if (right < left) {
      left = 0;
      right = 0;
    }
    if (left === right && s[i] === "(") {
      max = Math.max(max, left + right);
    }
  }
  return max;
};

console.log(longestValidParentheses(')()())')); // ()()
console.log(longestValidParentheses('(()'));
console.log(longestValidParentheses(''));
console.log(longestValidParentheses(')('));


// 时间复杂度O(n)
// 空间复杂度O(1)