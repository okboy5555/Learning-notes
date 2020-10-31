三个变种

let id = 'ID'
let fun = () => {
  console.log(this.id)
}
fun()
fun.call({id: 'ID2'})

// undefined
// undefined


var id = 'ID'
let fun = () => {
  console.log(this.id)
}
fun()
fun.call({id: 'ID2'})

// ID
// ID

var id = 'ID'
function fun() {
  console.log(this.id)
}
fun()
fun.call({ id: 'ID2' })

// ID
// ID2


原型链 函数 相关

function Person(name) {
  this.name = name
}

Person.prototype.print = function() {
  console.log(this)
  return this.name
}

Person('abc')
const a = new Person('abc').print.call({})
console.log(a)

// undefined


const fn = () => {
  this.x = 'z'
}
const b = { x: 'y' }
fn.call(b)
console.log(b)
// {x: "y"}


this是指针，指向我们调用函数的对象

1、全局环境的this指向全局 window

2、函数中this指向调用函数的方式
（1）函数独立调用 严格模式指向undefined  非严格模式指向window
（2）如果这个函数被某一对象调用，this指向被调用的对象

3、构造函数与原型里面的this
指向实例

4、箭头函数 this指向定义的上下文