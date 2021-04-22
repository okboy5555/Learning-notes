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