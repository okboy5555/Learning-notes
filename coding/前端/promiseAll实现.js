let p1 = Promise.resolve(1),
  p2 = Promise.resolve(2),
  p3 = Promise.resolve(3)

let diPromiseAll = function (promises) {
  return new Promise((resolve,reject) => {
    if(!Array.isArray(promises)) {
      throw new TypeError('not a array')
    }
    let result = []
    let count = 0
    promises.forEach((promise,index) => {
      promise.then((res) => {
        result[index] = res
        count++
        if(count === promises.length) {
          resolve(result)
        }
      })
    })
  })
}
diPromiseAll([p1, p2, p3]).then((res) => {
  console.log(res, 'res')
}, (err) => {
  console.log(err, 'err')
})