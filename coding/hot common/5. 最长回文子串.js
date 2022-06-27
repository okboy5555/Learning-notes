// https://leetcode.cn/problems/longest-palindromic-substring/
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
const expandCenter = (s, L, R) => {
  while (L >= 0 && R < s.length && s[L] === s[R]) {
    L--;
    R++;
  }
  return R - L - 1;
}
var longestPalindrome = function (s) {
  if (s.length < 1) {
    return s;
  }
  let start = 0, end = 0;
  for (let i = 0; i < s.length - 1; i++) {
    let len1 = expandCenter(s, i, i);
    let len2 = expandCenter(s, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = Math.ceil(i - (len - 1) / 2);
      end = Math.floor(i + len / 2);
    }
  }
  return s.substring(start, end + 1);
};
console.log(longestPalindrome('bb'))
console.log(longestPalindrome('accb'))
// console.log(longestPalindrome('ccc'))
// console.log(longestPalindrome(' '))
// console.log(longestPalindrome('babad'))

// 时间复杂度O(n²)，空间复杂度O(1)。