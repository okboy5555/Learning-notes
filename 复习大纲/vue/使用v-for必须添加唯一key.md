使用v-for更新已渲染的元素列表时,默认用就地复用策略;列表数据修改的时候,他会根据key值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素


两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。
同一层级的一组节点，他们可以通过唯一的id进行区分。基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)


```
之前的数据                              之后的数据

key: 1  id: 1 index: 0 name: test1     key: 1  id: 1 index: 0  name: test1
key: 2  id: 2 index: 1 name: test2     key: 4  id: 4 index: 1  name: 我是插队的那条数据
key: 3  id: 3 index: 2 name: test3     key: 2  id: 2 index: 2  name: test2
                                       key: 3  id: 3 index: 3  name: test3
```

现在对比发现只有一条数据变化了,就是id为4的那条数据,因此只要新渲染这一条数据就可以了,其他都是就复用之前的


对于 Vue 来说：

key的作用主要是为了高效的更新虚拟DOM列表,key 值是用来判断 VDOM 元素项的唯一依据。
使用key不保证100%比不使用快，这就和Vdom不保证比操作原生DOM快是一样的，这只是一种权衡，其实对于用index作为key是不推荐的，除非你能够保证他们不会发生变化。

对于 React 来说：

key不是用来提升react的性能的，不过用好key对性能是有帮助的。
不能使用random来使用key
key相同，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新。
key不同，则react先销毁该组件(有状态组件的componentWillUnmount会执行)，然后重新创建该组件（有状态组件的constructor和componentWillUnmount都会执行）

不加 key 的利弊：

当组件很纯粹，没有数据绑定，基于这个前提下，可以更有效的复用节点，diff 速度来看也是不带 key 更加快速的，因为带 key 在增删节点上有耗时，可以不加 key 以达到就地复用的好处。
这种模式会带来一些隐藏的副作用，比如可能不会产生过渡效果，或者在某些节点有绑定数据（表单）状态，会出现状态错位。
