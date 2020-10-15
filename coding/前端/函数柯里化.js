function add() {
  var _args = Array.prototype.slice.call(arguments)

  // 利用闭包不会释放函数里边的变量特性，把新的参数再push到原来的参数里边
  var _addr = function () {
    _args.push(...arguments)
    return _addr
  }

  // 利用每次输出值的时候， 会自动调toString的方法， 在这里重写一下toString
  _addr.toString = () => _args.reduce((total, num) => total + num)

  return _addr
}

console.log(add(1, 2, 3)(4)(5))