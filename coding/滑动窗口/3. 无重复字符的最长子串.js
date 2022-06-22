// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// https://leetcode.cn/problems/longest-substring-without-repeating-characters/
/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let left = 0, right = 0, ans = 0;
  while (left < s.length) {
    if (!map.has(s[right]) && right < s.length) {
      map.set(s[right], right);
      right++;
    } else {
      ans = Math.max(ans, right - left);
      left++;
      map.delete(s[left - 1]);
    }
  }
  return ans;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bb"));
console.log(lengthOfLongestSubstring(" "));
console.log(lengthOfLongestSubstring(""));
console.log((lengthOfLongestSubstring("pwwkew"))) // 3

// 时间复杂度O(n)
// 空间复杂度O(字符个数)