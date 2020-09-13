BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域

触发条件或者说哪些元素会生成BFC：
　　满足下列条件之一就可触发BFC
　　【1】根元素，即HTML元素
　　【2】float的值不为none
　　【3】overflow的值不为visible
　　【4】display的值为inline-block、table-cell、table-caption
　　【5】position的值为absolute或fixed

BFC布局规则：
1.内部的Box会在垂直方向，一个接一个地放置。
2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4.BFC的区域不会与float box重叠。
5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6.计算BFC的高度时，浮动元素也参与计算


清除浮动的原理是两个div都位于同一个浮动的BFC区域之中
