如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件。

对于 keep-alive 组件来说，它拥有两个独有的生命周期钩子函数，分别为 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

当引入keep-alive 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated
事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中


keepalive 可以接收3个属性做为参数进行匹配对应的组件进行缓存:

include 包含的组件(可以为字符串，数组，以及正则表达式,只有匹配的组件会被缓存)
exclude 排除的组件(以为字符串，数组，以及正则表达式,任何匹配的组件都不会被缓存)
max 缓存组件的最大值(类型为字符或者数字,可以控制缓存组件的个数)


常见问题：如果只想要router-view里面的某个组件被缓存，怎么办？
1、用 include (exclude例子类似)
缺点：需要知道组件的 name，项目复杂的时候不是很好的选择
```
<keep-alive include="a">
    <router-view>
        <!-- 只有路径匹配到的 include 为 a 组件会被缓存 -->
    </router-view>
</keep-alive>
```
2、使用 meta 属性
优点：不需要例举出需要被缓存组件名称 使用$route.meta的keepAlive属性：
```
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```
需要在router中设置router的元信息meta
//...router.js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/page1',
      name: 'Page1',
      component: Page1,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})