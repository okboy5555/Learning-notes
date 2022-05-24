// 给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​

// 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

// 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

//  

// 示例 1:

// 输入: prices = [1,2,3,0,2]
// 输出: 3 
// 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
// 示例 2:

// 输入: prices = [1]
// 输出: 0
//  

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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