/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let findKthLargest = function(nums, k) {
  // 从 nums 中取出前 k 个数，构建一个小顶堆
  let heap = [,], i = 0
  while(i < k) {
     heap.push(nums[i++]) 
  }
  buildHeap(heap, k)
  
  // 从 k 位开始遍历数组
  for(let i = k; i < nums.length; i++) {
      if(heap[1] < nums[i]) {
          // 替换并堆化
          heap[1] = nums[i]
          heapify(heap, k, 1)
      }
  }
  
  // 返回堆顶元素
  return heap[1]
};

// 原地建堆，从后往前，自上而下式建小顶堆
let buildHeap = (arr, k) => {
  if(k === 1) return
  // 从最后一个非叶子节点开始，自上而下式堆化
  for(let i = Math.floor(k/2); i>=1 ; i--) {
      heapify(arr, k, i)
  }
}

// 堆化
let heapify = (arr, k, i) => {
  // 自上而下式堆化
  while(true) {
      let minIndex = i
      if(2*i <= k && arr[2*i] < arr[i]) {
          minIndex = 2*i
      }
      if(2*i+1 <= k && arr[2*i+1] < arr[minIndex]) {
          minIndex = 2*i+1
      }
      if(minIndex !== i) {
          swap(arr, i, minIndex)
          i = minIndex
      } else {
          break
      }
  }
}

// 交换
let swap = (arr, i , j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// @lc code=end




// 具体步骤如下：

// 从数组中取前 k 个数（ 0 到 k-1 位），构造一个小顶堆
// 从 k 位开始遍历数组，每一个数据都和小顶堆的堆顶元素进行比较，如果小于堆顶元素，则不做任何处理，继续遍历下一元素；如果大于堆顶元素，则将这个元素替换掉堆顶元素，然后再堆化成一个小顶堆。
// 遍历完成后，堆顶的数据就是第 K 大的数据
// 时间复杂度：遍历数组需要 O(n) 的时间复杂度，一次堆化需要 O(logk) 时间复杂度，所以利用堆求 Top k 问题的时间复杂度为 O(nlogk)
// 空间复杂度：O(k)