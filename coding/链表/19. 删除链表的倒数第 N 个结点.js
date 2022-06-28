var removeNthFromEnd = function(head, n) {
  if(!n){
      return head
  }
  let cur = head;
  let temp = head;
  let pre = head;

  while(n){
      temp = temp.next;
      n--
  }

  if(!temp){
      head = head.next
      return head
  }

  while(temp){
      pre = cur;
      cur = cur.next;
      temp = temp.next;
  }

  pre.next = cur.next
  
  return head
};

// 时间复杂度O(n)
// 空间复杂度O(1)