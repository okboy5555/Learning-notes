// https://leetcode.cn/problems/sort-list/solution/pai-xu-lian-biao-by-leetcode-solution/
// 一、自顶向下归并排序

// const merge = (head1, head2) => {
//   const dummyHead = new ListNode(0);
//   let temp = dummyHead, temp1 = head1, temp2 = head2;
//   while (temp1 !== null && temp2 !== null) {
//       if (temp1.val <= temp2.val) {
//           temp.next = temp1;
//           temp1 = temp1.next;
//       } else {
//           temp.next = temp2;
//           temp2 = temp2.next;
//       }
//       temp = temp.next;
//   }
//   if (temp1 !== null) {
//       temp.next = temp1;
//   } else if (temp2 !== null) {
//       temp.next = temp2;
//   }
//   return dummyHead.next;
// }

// const toSortList = (head, tail) => {
//   if (head === null) {
//       return head;
//   }
//   if (head.next === tail) {
//       head.next = null;
//       return head;
//   }
//   let slow = head, fast = head;
//   while (fast !== tail) {
//       slow = slow.next;
//       fast = fast.next;
//       if (fast !== tail) {
//           fast = fast.next;
//       }
//   }
//   const mid = slow;
//   return merge(toSortList(head, mid), toSortList(mid, tail));
// }

// var sortList = function(head) {
//   return toSortList(head, null);
// };

// 时间复杂度O(nlogn)
// 空间复杂度O(logn)

// 二、自底向上归并排序
const merge = (head1, head2) => {
  const dummyHead = new ListNode(0);
  let temp = dummyHead, temp1 = head1, temp2 = head2;
  while (temp1 !== null && temp2 !== null) {
      if (temp1.val <= temp2.val) {
          temp.next = temp1;
          temp1 = temp1.next;
      } else {
          temp.next = temp2;
          temp2 = temp2.next;
      }
      temp = temp.next;
  }
  if (temp1 !== null) {
      temp.next = temp1;
  } else if (temp2 !== null) {
      temp.next = temp2;
  }
  return dummyHead.next;
}

var sortList = function(head) {
  if (head === null) {
      return head;
  }
  let length = 0;
  let node = head;
  while (node !== null) {
      length++;
      node = node.next;
  }
  const dummyHead = new ListNode(0, head);
  for (let subLength = 1; subLength < length; subLength <<= 1) {
      let prev = dummyHead, curr = dummyHead.next;
      while (curr !== null) {
          let head1 = curr;
          for (let i = 1; i < subLength && curr.next !== null; i++) {
              curr = curr.next;
          }
          let head2 = curr.next;
          curr.next = null;
          curr = head2;
          for (let i = 1; i < subLength && curr != null && curr.next !== null; i++) {
              curr = curr.next;
          }
          let next = null;
          if (curr !== null) {
              next = curr.next;
              curr.next = null;
          }
          const merged = merge(head1, head2);
          prev.next = merged;
          while (prev.next !== null) {
              prev = prev.next;
          }
          curr = next;
      }
  }
  return dummyHead.next;
};

// 时间复杂度O(nlogn)
// 空间复杂度O(1)