```
function vuexInit () {
    const options = this.$options;
    if (options.store) {
        this.$store = options.store;
    } else {
        this.$store = options.parent.$store;
    }
}
```


用Vue.mixin 方法将 vuexInit 方法混淆进 beforeCreate 钩子中，所以每一个 vm 实例都会调用 vuexInit 方法。

如果是根节点（$options中存在 store 说明是根节点），则直接将 options.store 赋值给 this.$store。否则则说明不是根节点，从父节点的 $store 中获取。

通过这步的操作，我们已经可以在任意一个 vm 中通过 this.$store 来访问 Store 的实例


一些概念：
state
用于数据的存储，是store中的唯一数据源
每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段

getter
如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
store的计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

Mutation
类似函数，改变state数据的唯一途径，且不能用于处理异步事件
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
```
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

action
类似函数，改变state数据的唯一途径，且不能用于处理异步事件
Action 类似于 mutation，不同在于：
Action 提交的是 mutation，而不是直接变更状态。

Module
类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护
Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块