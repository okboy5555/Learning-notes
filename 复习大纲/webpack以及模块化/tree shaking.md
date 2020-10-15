Tree Shaking 正常工作的前提是交给 Webpack 的 JavaScript 代码必须是采用 ES6 模块化语法的， 因为 ES6 模块化语法是静态的（导入导出语句中的路径必须是静态的字符串，而且不能放入其它代码块中），这让 Webpack 可以简单的分析出哪些 export 的被 import 过了。 如果你采用 ES5 中的模块化，例如 module.export={...}、require(x+y)、if(x){require('./util')}，Webpack 无法分析出哪些代码可以剔除

局限性：
不会对entry入口文件做 Tree Shaking。
不会对异步分割出去的代码做 Tree Shaking。

首先，为了把采用 ES6 模块化的代码交给 Webpack，需要配置 Babel 让其保留 ES6 模块化语句，修改 .babelrc 文件为如下：
```
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}
```
配置好 Babel 后，重新运行 Webpack，在启动 Webpack 时带上 --display-used-exports 参数，以方便追踪 Tree Shaking 的工作
其中 "modules": false 的含义是关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法


剔除用不上的代码还得经过 UglifyJS 去处理一遍,也可以通过--optimize-minimize

当你的项目使用了大量第三方库时，你会发现 Tree Shaking 似乎不生效了，原因是大部分 Npm 中的代码都是采用的 CommonJS 语法， 这导致 Tree Shaking 无法正常工作而降级处理。 但幸运的时有些库考虑到了这点，这些库在发布到 Npm 上时会同时提供两份代码，一份采用 CommonJS 模块化语法，一份采用 ES6 模块化语法。 并且在 package.json 文件中分别指出这两份代码的入口

node_modules/redux
|-- es
|   |-- index.js # 采用 ES6 模块化语法
|-- lib
|   |-- index.js # 采用 ES5 模块化语法
|-- package.json

package.json 文件中有两个字段：

{
  "main": "lib/index.js", // 指明采用 CommonJS 模块化的代码入口
  "jsnext:main": "es/index.js" // 指明采用 ES6 模块化的代码入口
}

mainFields 用于配置采用哪个字段作为模块的入口描述。 为了让 Tree Shaking 对 redux 生效，需要配置 Webpack 的文件寻找规则为如下
```
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
};
```
如果不存在 jsnext:main 就采用 browser 或者 main 作为入口


Webpack Tree shaking不会清除IIFE(立即调用函数表达式)
因为IIFE比较特殊，它在被翻译时(JS并非编译型的语言)就会被执行，Webpack不做程序流分析，它不知道IIFE会做什么特别的事情，所以不会删除这部分代码
Webpack Tree shaking对于IIFE的返回函数，如果未使用会被清除

