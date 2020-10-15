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