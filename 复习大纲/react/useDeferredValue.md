demo1: https://codesandbox.io/s/usedeferredvalue-demo-1-7hgr3l
我们使用一个 input 输入框和一个长列表来模拟带 search 功能的 Select 组件，input 输入框受控，长列表有 50000 个节点。在示例中，我们可以看到页面在整个交互过程中有明显的卡顿，这是因为 50000 个节点的 reconcile 过程占据了 js 引擎较多的时间，导致渲染引擎被阻塞。
通常情况下，用户会希望能立即看到自己输入的内容，查询的结果可以稍后展示。基于此，我们可以使用 useDeferredValue 来做优化，将 input 更新作为紧急的部分优先处理，长列表更新作为不紧急的部分延迟处理
demo2: https://codesandbox.io/s/usedeferredvalue-2-demo-teyr9j
使用 useDeferredValue 之后，input 输入框的交互并没有提升，输入和删除的时候依旧有明显的卡顿。
在上面示例中，虽然我们使用了 useDeferredValue，但并没有发挥出它的效果。我们仅仅延迟了长列表需要的 deferredValue，长列表对应的协调过程并没有延迟。当 input 更新开始协调时，依旧要处理 50000 个节点，使得 js 引擎占据了较多的时间，从而阻塞了渲染引擎。
为了能让 useDeferredValue 能发挥它应有的作用，我们可以将长列表抽离为一个 memo 组件，将 deferredValue 通过 props 传递给长列表组件。当 deferredValue 发生变化时，长列表组件开始更新。
demo3: https://codesandbox.io/s/usedeferredvalue-3-demo-g05i3z
我们可以发现将长列表抽离为 memo 组件以后，整个 input 的交互流畅了很多。在整个页面交互过程中，input 更新是高优先级更新，优先处理；而通过 useDeferredValue，长列表更新变为了低优先级更新，延迟处理且可中断。