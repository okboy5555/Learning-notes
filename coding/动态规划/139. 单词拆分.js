// https://leetcode.cn/problems/word-break/
var wordBreak = function (s, wordDict) {
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < wordDict.length; j++) {
      let word = wordDict[j];
      if (i + word.length > s.length || dp[i + word.length]) continue;
      if (s.slice(i, i + word.length) === word) {
        dp[i + word.length] = dp[i];
      }
    }
  }
  return dp[s.length];
};

// 时间复杂度O(n*m) n为s长度 m为word长度
// 空间复杂度O(n)