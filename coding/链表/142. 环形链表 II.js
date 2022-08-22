// https://leetcode.cn/problems/linked-list-cycle-ii/
var detectCycle = function(head) {
  if(!head) {
      return null
  };
  if(head.next  == head) {
      return head;
  }
  let slow = head;
  let fast = head;
  while(fast) {
      if(fast.next == null) {
          return null;
      }
      slow = slow.next;
      fast = fast.next.next;
      // 找到环
      if(slow === fast) {
          fast = head;
          while (true) {
              if(fast === slow) {
                  return slow;
              }
              fast = fast.next;
              slow = slow.next;
          }
      }
  }
  return null;
};

// 时间复杂度O(N) N 为链表中节点的数目  总的时间为2N
// 空间复杂度O(1)