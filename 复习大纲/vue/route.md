hash和history
hash —— 使用url的hash来模拟一个完整的url。比如这个 URL：http://www.abc.com/#/hello，hash 的值为 #/hello。它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面，同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用后退按钮，就可以回到上一个位置。
总结：hash模式通过锚点值的改变，根据不同的值，渲染指定dom位置的不同数据。利用hashChange事件，监听hash变化，可以在window对象上监听。
hash模式所有的工作都是在前端完成的，不需要后端服务的配合
hash模式的实现方式就是通过监听URL中hash部分的变化，从而做出对应的渲染逻辑
hash模式下，URL中会带有#，看起来不太美观

history —— 配置：mode:history， 利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。
刷新当前页面会去请求服务器，如果没有资源就报404
window.history.go 可以跳转到浏览器会话历史中的指定的某一个记录页
window.history.forward 指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
window.history.back 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
window.history.pushState 可以将给定的数据压入到浏览器会话历史栈中
window.history.replaceState 将当前的会话页面的url替换成指定的数据

popstate
每当激活同一文档中不同的历史记录条目时，popstate 事件就会在对应的 window 对象上触发。如果当前处于激活状态的历史记录条目是由 history.pushState() 方法创建的或者是由 history.replaceState() 方法修改的，则 popstate 事件的 state 属性包含了这个历史记录条目的 state 对象的一个拷贝。
调用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。popstate 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 history.back() 方法）。即，在同一文档的两个历史记录条目之间导航会触发该事件

改写
```
let _wr = function(type) {
   let orig = history[type]
   return function() {
      let rv = orig.apply(this, arguments)
      let e = new Event(type)
      e.arguments = arguments
      window.dispatchEvent(e)
      return rv
   }
}

 history.pushState = _wr('pushState')
 history.replaceState = _wr('replaceState')
```
执行完上面两个方法后，相当于将pushState和replaceState这两个监听器注册到了window上面


query和path

如果提供了 path，params 会被忽略

使用方法
```
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

```
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```
同样的规则也适用于 router-link 组件的 to 属性


导航守卫相关

全局前置守卫
router.beforeEach
```
router.beforeEach((to, from, next) => {
  // ...
})
```

全局解析守卫
router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

全局后置钩子
```
router.afterEach((to, from) => {
  // ...
})
```

路由独享的守卫
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
这些守卫与全局前置守卫的方法参数是一样的

组件内的守卫
```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```


完整的导航解析流程
导航被触发
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。