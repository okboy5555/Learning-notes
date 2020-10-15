// promise.all中任何一个promise 出现错误的时候都会执行reject，导致其它正常返回的数据也无法使用。

// 切入点 1：
// 由于Promise.all(request).then(…).catch(…) 会在所有request都resolve时才会进then方法，并且把所
// 有结果以一个数组返回，只要有一个失败，就会进catch。而如果在单个请求中定义了catch方法，那么就
// 不会进Promise.all的catch方法。因此，可以在单个的catch中对失败的promise请求做处理，可以使
// 成功的请求正常返回。

function getData (api) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var ok = Math.random() > 0.5  // 模拟请求成功或失败
      if (ok)
        resolve('get ' + api + ' data')
      else {
        reject('error') // 正常的reject
      }
    }, 2000)
  })
}
function getDatas (arr) {
  var promises = arr.map(item => getData(item))
  return Promise.all(promises.map(p => p.catch(e => e))).then(values => { // 关键步骤，map(p => p.catch(e => e)) 在每个请求后加上 catch 捕获错误；
    values.map((v, index) => {
      if (v == 'error') {
        console.log('第' + (index + 1) + '个请求失败')
      } else {
        console.log(v)
      }
    })
  }).catch(error => {
    console.log(error)
  })
}
getDatas(['./api1', './api2', './api3', './api4']).then(() => '请求结束')

// 切入点 2：
// 出现错误请求之后不进行reject操作,而是继续resolve('error), 之后同意交给promise.all()进行处理

function getData(api){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      var ok = Math.random() > 0.5  // 模拟请求成功或失败
      if(ok)
        resolve('get ' + api + ' data')
      else{
        // reject(api + ' fail')   // 如果调用reject就会使Promise.all()进行失败回调
        resolve('error')    // Promise all的时候做判断  如果是error则说明这条请求失败
      }
    },2000)
  })
}
function getDatas(arr){
  var promises = arr.map(item => getData(item))
  return Promise.all(promises).then(values => {
    values.map((v,index) => {
      if(v == 'error'){
        console.log('第' + (index+1) + '个请求失败')
      }else{
        console.log(v)
      }
    })
  }).catch(error => {
    console.log(error)
  })
}
getDatas(['./api1','./api2','./api3','./api4']).then(() => '请求结束')