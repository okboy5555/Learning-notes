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

几个问题：

使用Vuex只需执行 Vue.use(Vuex)，并在Vue的配置中传入一个store对象的示例，store是如何实现注入的？

答：Vue.use(Vuex) 方法执行的是install方法，它实现了Vue实例对象的init方法封装和注入，使传入的store对象被设置到Vue上下文环境的$store中。因此在Vue Component任意地方都能够通过this.$store访问到该store。

2.  问：state内部支持模块配置和模块嵌套，如何实现的？

答：在store构造方法中有makeLocalContext方法，所有module都会有一个local context，根据配置时的path进行匹配。所以执行如dispatch('submitOrder', payload)这类action时，默认的拿到都是module的local state，如果要访问最外层或者是其他module的state，只能从rootState按照path路径逐步进行访问。

3.  问：在执行dispatch触发action(commit同理)的时候，只需传入(type, payload)，action执行函数中第一个参数store从哪里获取的？

答：store初始化时，所有配置的action和mutation以及getters均被封装过。在执行如dispatch('submitOrder', payload)的时候，actions中type为submitOrder的所有处理方法都是被封装后的，其第一个参数为当前的store对象，所以能够获取到 { dispatch, commit, state, rootState } 等数据。

4.  问：Vuex如何区分state是外部直接修改，还是通过mutation方法修改的？

答：Vuex中修改state的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 this._withCommit(fn) 设置_committing标志变量为true，然后才能修改state，修改完毕还需要还原_committing变量。外部修改虽然能够直接修改state，但是并没有修改_committing标志位，所以只要watch一下state，state change时判断是否_committing值为true，即可判断修改的合法性。

5.  问：调试时的”时空穿梭”功能是如何实现的？

答：devtoolPlugin中提供了此功能。因为dev模式下所有的state change都会被记录下来，’时空穿梭’ 功能其实就是将当前的state替换为记录中某个时刻的state状态，利用 store.replaceState(targetState) 方法将执行this._vm.state = state 实现。


文章参考
https://tech.meituan.com/2017/04/27/vuex-code-analysis.html