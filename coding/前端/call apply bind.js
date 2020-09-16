Function.prototype.mycall = function() {
  let [thisArg,...args] =  [...arguments]
  console.log([...arguments])
  thisArg.fn = this || window
  let result = thisArg.fn(...args)
  delete thisArg.fn
  return result
}

Function.prototype.myapply = function() {
  let [thisArg, args] = [...arguments]
  thisArg.fn = this
  let result = thisArg.fn(...args)
  delete thisArg.fn
  return result
}


//测试用例
let cc = {
  a: 1
}

function demo(x1, x2) {
  console.log(typeof this, this.a, this)
  console.log(x1, x2)
}
demo.apply(cc, [2, 3])
demo.myapply(cc, [2, 3])
demo.call(cc,33,44)
demo.mycall(cc,33,44)

Function.prototype.mybind = function(context, ...args) {
  return (...newArgs) => {
    return this.call(context,...args,...newArgs)
  }
}

// 测试用例
let aa = {
  name : 'TianTian'
}
function say(something,other){
  console.log(`I want to tell ${this.name} ${something}`);
  console.log('This is some'+other)
}
let tmp = say.mybind(aa,'happy','you are cute')
let tmp1 = say.bind(aa,'happy','you are cute')
tmp()
tmp1()