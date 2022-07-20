// https://leetcode.cn/problems/edit-distance/
const minDistance = (word1, word2) => {
  let dp = Array.from(Array(word1.length + 1), () => Array(word2.length + 1).fill(0));

  //初始化数组，word1前i个字符最少需要i次操作，比如i次删除变成word2
  for (let i = 1; i <= word1.length; i++) {
      dp[i][0] = i;
  }

  //初始化数组，word2前i个字符最少需要i次操作，比如j次插入变成word1
  for (let j = 1; j <= word2.length; j++) {
      dp[0][j] = j;
  }

  for (let i = 1; i <= word1.length; i++) {
      //循环word1和word2
      for (let j = 1; j <= word2.length; j++) {
          if (word1[i - 1] === word2[j - 1]) {
              //如果word1[i-1] === word2[j-1],说明最后一个字符不用操作。
              dp[i][j] = dp[i - 1][j - 1];
          } else {
              //dp[i-1][j] + 1：对应删除
              //dp[i][j-1] + 1：对应新增
              // dp[i-1][j-1] + 1：对应替换操作
              dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
          }
      }
  }

  return dp[word1.length][word2.length];
};

// 思路：dp[i][j] 表示word1前i个字符和word2前j个字符的最少编辑距离。
// 如果word1[i-1] === word2[j-1],说明最后一个字符不用操作，此时dp[i][j] = dp[i-1][j-1]，即此时的最小操作数和word1和word2都减少一个字符的最小编辑数相同
// 如果word1[i-1] !== word2[j-1]，则分为三种情况
// word1删除最后一个字符，状态转移成dp[i-1][j]，即dp[i][j] = dp[i-1][j] + 1，+1指删除操作
// word1在最后加上一个字符，状态转移成dp[i][j-1]，即dp[i][j] = dp[i][j-1] + 1，+1指增加操作
// word1替换最后一个字符，状态转移成dp[i-1][j-1]，即dp[i] [j] = dp[i-1] [j-1] + 1，+1指替换操作
// 复杂度：时间复杂度是O(mn) ，m是word1的长度，n是word2的长度。空间复杂度是O(mn) ，需要用m * n大小的二维数字存储状态。
