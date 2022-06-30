// https://leetcode.cn/problems/3sum/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function (nums) {
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};

// 时间复杂度 O(N²)
// 空间复杂度 O(logN) 我们忽略存储答案的空间，
// 额外的排序的空间复杂度为O(logN)。
// 然而我们修改了输入的数组 nums，
// 在实际情况下不一定允许，因此也可以看成使用了一个额外的数组存储
// 了 nums 的副本并进行排序，空间复杂度为 O(N)。



// console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// console.log(threeSum([0]))
// console.log(threeSum([-2, 0, 1, 1, 2]))
// console.log(threeSum([0, 0, 0, 0]))
console.log(threeSum([1, 2, -2, -1]))