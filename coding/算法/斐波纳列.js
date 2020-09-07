// let fibonacci = function(n) {
//   if(n== 0 || n == 1) {
//     return n
//   }
//   return fibonacci(n-1) + fibonacci(n-2)
// }
// console.log(fibonacci(3))

let fibonacci = function (n) {
  if (n == 1 || n == 2) {
    return 1
  }
  let ac1 = 1, ac2 = 1
  for (let i = 0; i < n; i++) {
    [ac1, ac2] = [ac2, ac1 + ac2]
  }
  return ac1
}

console.log(fibonacci(4))