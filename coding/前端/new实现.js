function myNew(constructor, ...rest) {
  // 请在此处完善代码，不能直接使用 new 操作符
 }
 function Fun(name,sex) {
   this.name = name
   this.sex = sex
 }
 Fun.prototype.getUserInfo = function() {
   return `我的姓名${this.name},我的性别${this.sex}`
 }
 
 const fun = myNew(Fun,'子君','男')
 // 我的姓名子君，我的性别男
 console.log(fun.getUserInfo())


 function myNew(constructor, ...rest) {
  if (typeof constructor !== 'function') {
        return constructor;
    }
    //创建新的对象,关联构造函数的原型对象
    const _constructor = Object.create(constructor.prototype);
    //执行构造函数
    const obj = constructor.apply(_constructor, rest);
    //如果构造函数执行结果是对象则返回执行结果
    if (typeof obj === 'object') {
        return obj;
    } else {
        return _constructor;
    }
}
function Fun(name,sex) {
  this.name = name
  this.sex = sex
}
Fun.prototype.getUserInfo = function() {
  return `我的姓名${this.name},我的性别${this.sex}`
}

const fun = myNew(Fun,'子君','男')
// 我的姓名子君，我的性别男
console.log(fun.getUserInfo())

// 创建一个空对象，作为将要返回的对象实例
// 将这个空对象的原型，指向了构造函数的prototype属性
// 将这个空对象赋值给函数内部的this关键字
// 开始执行构造函数内部的代码
// 如果构造函数返回一个对象，那么就直接返回该对象，否则返回创建的对象