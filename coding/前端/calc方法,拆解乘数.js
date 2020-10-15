function isPrime (num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
      return false
    }
  }
  return true
}

function calc (n) {
  let list = []
  while (n > 1) {
    for (let i = 2; i <= n; i++) {
      if (isPrime(i) && n % i === 0) {
        list.push(i)
        n /= i
      }
    }
  }
  return list
}

console.log(calc(2))
// [2]

console.log(calc(8))
// [2, 2, 2]

console.log(calc(24))

// [2, 2, 2, 3]

console.log(calc(30))
// [2, 3, 5]