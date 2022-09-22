var maximalSquare = function (matrix) {
  const row = matrix.length;
  const col = matrix[0].length;
  const dp = new Array(row).fill(0).map(() => new Array(col).fill(0));

  let maxLen = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] === "0") continue;
      dp[i][j] =
        Math.min(
          dp[i - 1]?.[j] || 0,
          dp[i][j - 1] || 0,
          dp[i - 1]?.[j - 1] || 0
        ) + 1;
      maxLen = Math.max(maxLen, dp[i][j]);
    }
  }

  return maxLen * maxLen;
};

// 时间复杂度O(mn)
// 空间复杂度O(mn)