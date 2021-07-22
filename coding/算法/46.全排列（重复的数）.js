// 思路是这样，首先我们对数组进行排序，让重复的数字相邻，
// 然后开始递归（要回溯），如果当前数字跟前一个相同，则跳过。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permuteUnique = function(nums) {
  let res = [];
  let len = nums.length
  nums.sort((a,b)=>{ //排序
      return a-b
  })
  unique([],0)
  return res
  function unique(arr) {
      if(arr.length == len) res.push([...arr])
      for(let i=0;i<nums.length;i++){
          if(nums[i] == nums[i-1]) continue // 跳过，避免重复结果
          arr.push(nums[i])
          nums.splice(i,1)
          unique(arr)
          nums.splice(i,0,arr.pop()) // 回溯
      }
  }

};