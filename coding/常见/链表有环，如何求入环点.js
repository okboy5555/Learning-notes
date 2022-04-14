// https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/141ti-de-kuo-zhan-ru-guo-lian-biao-you-huan-ru-he-/
var detectCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast) {
    if (fast.next == null) { // fast.next走出链表了，说明无环
      return null;
    }
    slow = slow.next;        // 慢指针走一步
    fast = fast.next.next;   // 慢指针走一步
    if (slow == fast) {      // 首次相遇
      fast = head;           // 让快指针回到头节点
      while (true) {         // 开启循环，让快慢指针相遇
        if (slow == fast) {  // 相遇，在入环处
          return slow;
        }
        slow = slow.next;
        fast = fast.next;    // 快慢指针都走一步
      }
    }
  }
  return null;
};