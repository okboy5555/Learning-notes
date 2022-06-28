/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function (nums) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
      map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }
  let arr = []
  for([k,v] of [...map.entries()]) {
      if(v === 1) {
          arr.push(k)
      }
  }
  return arr
};

// https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/