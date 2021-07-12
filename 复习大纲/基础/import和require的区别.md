import和require的区别
遵循规范：
import是ES6的一个语法标准，兼容浏览器需要转化成ES5的语法
require采用CommonJS/AMD规范
调用时间：
import是编译时调用，必须放在代码的开头
require是运行时调用，可以运用在代码的任何地方
实现过程：
import是解构过程，由于浏览器兼容问题，需要在node中用babel将ES6语法转化成为ES5语法再执行
require是赋值过程，require的结果就是module.exports后面的内容，例如对象、函数、字符串、数组等，最终把require的结果赋值给某个变量




require

动态编译
在使用 require 后，第一次加载某个模块时，会缓存该模块的暴露结果，后续如果加载该模块就会从缓存中获取。并且 require 是运行时调用，所以 require 理论上可以运用在代码的任何地方，你甚至可以写在 if 判断语句之中。
// test.js
module.exports = {
    myStatus:'初始化'
}

// main.js
require('./test').myStatus = '修改过了'
const test = require('./test').myStatus
// 修改过了
console.log(test)
复制代码
我们在 main.js 多次加载了 test.js，并且修改了缓存值。我们进行多次打印，发现值并不一样，说明并没有从新加载example模块， 而是从缓存中获取的该模块。
注意：require 即便通过解构进行引入，代码的实质是整体加载整个模块（即加载所有），生成一个对象，然后再从这个对象上面读取。

import
import 是由官方提出的模块加载方案，ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
静态编译
import 模块时只是生成引用，等到需要时才去取值，所以不存在缓存的问题。

本人的理解为：import 建立了文件模板之间的依赖关系，通过引用去获取，当你需要的时候，去相应模块去获取，所以不存在阻塞的现象。

值得注意的是：和其他语言语法类似，你应该把 import 放在文件头部。
动态加载
当然 import 无法做到 require 的动态加载。所以官网又提出了 import 函数来进行了补足。
import(`./xxxx.js`)
  .then(module => {
    ...
  })
  .catch(err => {
    ...
  });