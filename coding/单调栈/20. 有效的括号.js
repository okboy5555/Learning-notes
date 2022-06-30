// https://leetcode.cn/problems/valid-parentheses/
var isValid = function (s) {
  var map = {
    "(": -1,
    ")": 1,
    "{": -2,
    "}": 2,
    "[": -3,
    "]": 3,
  };
  var stack = [];
  for (var i = 0; i < s.length; i++) {
    if(map[s[i]] < 0) {
      stack.push(map[s[i]]);
    }else {
      if(stack.length === 0) {
        return false;
      }
      if(stack[stack.length -1] + map[s[i]] !== 0) {
        return false;
      }
      stack.pop();
    }
  }
  if(stack.length > 0) return false;;
  return true;
};
// console.log(isValid("()[]{}"))
// console.log(isValid('(]'))
console.log(isValid('('))

// 时间复杂度O(n)
// 空间复杂度O(n) n为字符串个数