v15

v15架构，分为两层：
Reconciler（协调器）—— 负责进行 Diff 运算，调用组件生命周期方法等
Renderer（渲染器）——负责将变化的组件渲染到页面上（分平台主要有 ReactDOM、ReactNative）


每当有更新发生时，Reconciler 会做如下工作：

调用函数组件的 render 方法，将返回的 JSX 转化为 Virtual DOM
将 Virtual DOM 和上次更新时的 Virtual DOM 进行对比
通过 Diff 找出差异
通知 Renderer，将变化的 Virtual DOM 渲染到页面上

1、stack reconciler 不能中途被打断
React v15 的 reconciler 会同时遍历两个新旧子元素列表 Virtual DOM，Diff 差异，当产生差异时，生成一个 mutation，通知 Renderer 更新渲染组件。
其中，v15 使用的是 JS 引擎自身的函数调用栈，只要有子节点，会一直保持迭代，直至处理完所有节点，堆栈为空，才退出堆栈（React 团队也称这个 reconsiler 为 stack reconciler）。其中，整个过程的 JS 计算，会一直占据浏览器主线程。

2、浏览器为什么会出现掉帧
按浏览器每秒刷新 60 次来算（即所谓的 60 FPS），当页面需要连续渲染，却在下一个 16ms 内没有渲染的情况下，就会出现掉帧的现象
js运算长时间持续占用主线程，导致浏览器掉帧


如何解决，v16
在完成一个 work unit 之后，将主线程控制权交回给浏览器，如果浏览器有 UI 渲染工作要做的话，能让其在 16ms 的窗口期内，占用主线程有时间去做，而不像之前主线程被 stack 递归栈一直霸占而不得释放。在浏览器使用主线程完成渲染工作，有空闲时间后，再回到之前未完成的任务点继续完成剩余的 work unit。

