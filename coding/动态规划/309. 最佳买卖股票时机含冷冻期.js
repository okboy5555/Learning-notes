// 1.状态定义：
// 定义一个变量dp[i][j]，表示第i天的时候用户的收益，j=1表示用户当天账户持股，j=0表示用户当天没持股。
var maxProfit = function (prices) {
  if (prices.length < 2) return 0;
  // 建立二维数组
  let dp = new Array(prices.length);
  for (let i = 0; i < prices.length; i++) {
    dp[i] = new Array(2);
  };
  // 初始状态
  dp[0][0] = 0;
  dp[0][1] = 0 - prices[0];
  dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1]);
  dp[1][1] = Math.max(dp[0][1], -prices[1]);
  // 计算dp[i][j]
  for (let i = 2; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]);
  }
  return Math.max(dp[prices.length - 1][0])
};

// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

console.log(maxProfit([1,2,3,0,2]))