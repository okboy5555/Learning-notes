// 函数防抖(debounce)
// 概念： 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// 函数节流(throttle)
// 概念： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，
// 如果在同一个单位时间内某事件被触发多次，只有一次能生效。



function debounce(fn, delay) {
  let timer = null
  return function(...args) {
      let context = this
      if(timer) clearTimeout(timer)
      timer = setTimeout(function(){
          fn.apply(context,args)
      },delay)
  }
}

function throttle(fn, delay) {
  let flag = true,
      timer = null
  return function(...args) {
      let context = this
      if(!flag) return
      
      flag = false
      clearTimeout(timer)
      timer = setTimeout(function() {
          fn.apply(context,args)
          flag = true
      },delay)
  }
}