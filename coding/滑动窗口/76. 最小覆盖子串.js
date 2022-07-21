// https://leetcode.cn/problems/minimum-window-substring/
var minWindow = function (s, t) {
  let map = new Map();
  for (let i = 0; i < t.length; i++) {
    map.set(t[i], (map.get(t[i]) || 0) + 1);
  }
  let left = 0;
  let right = 0;
  // 代表匹配到的长度
  let count = 0;
  let min = Number.MAX_VALUE;
  let minLeft = 0;
  let minRight = 0;
  while (right < s.length) {
    if (map.has(s[right])) {
      map.set(s[right], map.get(s[right]) - 1);
      if (map.get(s[right]) >= 0) {
        count++;
      }
    }
    right++;
    // 当完全匹配完t的时候(当然有可能map的value会有负数)
    while (count === t.length) {
      if (right - left < min) {
        min = right - left;
        minLeft = left;
        minRight = right;
      }
      if (map.has(s[left])) {
        map.set(s[left], map.get(s[left]) + 1);
        if (map.get(s[left]) > 0) {
          count--;
        }
      }
      left++;
    }
  }
  return s.slice(minLeft, minRight);
};

// C为字符集大小
// 最坏情况下左右指针对 ss 的每个元素各遍历一遍，
// 哈希表中对 s 中的每个元素各插入、删除一次，
// 对 t 中的元素各插入一次。
// 每次检查是否可行会遍历整个 tt 的哈希表，哈希表的大小与字符集的大小有关
// 时间复杂度：O(C*|s| + |t|)
// 空间复杂度：O(C)