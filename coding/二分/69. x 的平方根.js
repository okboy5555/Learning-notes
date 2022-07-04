// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

// 示例 1：

// 输入：x = 4
// 输出：2
// 示例 2：

// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。

// 1、二分法
// 时间复杂度O(log(n)) 空间复杂度O(1)
/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function (x) {
  if (x < 2) return x;
  // 低位下标
  let lowIndex = 0
  // 高位下标
  let highIndex = Math.floor(x/2);

  while (lowIndex <= highIndex) {
      // 中间下标
      const midIndex = Math.floor((lowIndex + highIndex) / 2)
      if (x < midIndex * midIndex) {
          highIndex = midIndex - 1
      } else if (x > midIndex * midIndex) {
          lowIndex = midIndex + 1
      } else {
          // x === arr[midIndex]
          return midIndex
      }
  }
  return highIndex;
};

// 2、牛顿迭代法
// 时间复杂度O(log(n)) 空间复杂度O(1)
// https://www.zhihu.com/question/20690553
// Xn+1 = Xn - (Xn*Xn - x) / (2*Xn)
var mySqrt = function (x) {
  if (x === 0) return 0;
  var re = 1;
  while (!(re * re <= x && (re + 1) * (re + 1) > x)) {
    // re = parseInt(re-(re*re-x)/(2*re))
    re = re - (re * re - x) / (2 * re)
  }
  return re
};

console.log(mySqrt(8))

// 3、手算法
// v 是数字 x是多少位
// https://blog.csdn.net/hans774882968/article/details/120520958
const mySqrt = (v, x) => {
  let left = 1, right = v;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid * mid <= v) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  const part = right;
  let delta = v - part * part;
  if (delta === 0) {
    return part;
  }
  let temp = part;
  let res = [];
  if (delta > 0) {
    for (let i = 1; i <= x; i++) {
      let val = 9;
      for (let j = 0; j < 10; j++) {
        if (20 * temp * j + j * j > 100 * delta) {
          val = j - 1;
          break;
        }
      }
      res.push(val);
      delta = 100 * delta - (20 * temp * val + val * val);
      temp = temp * 10 + val;
    }
  }
  return part + '.' + res.join('');
}
console.log(mySqrt(8, 2))
console.log(Math.sqrt(5))
