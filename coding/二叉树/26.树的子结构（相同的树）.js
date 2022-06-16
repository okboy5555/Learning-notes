var isSubStructure = function(A, B) {
  if(!B || !A) return false
  return find(A,B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};

function find(A, B){
  if(!B) return true
  if(!A || A.val != B.val) return false
  return find(A.left,B.left) && find(A.right, B.right)
}


// https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/