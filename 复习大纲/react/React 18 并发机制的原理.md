1、react渲染流程
React 是通过 JSX 描述页面的，JSX 编译成 render function（也就是 React.createElement 等），执行之后产生 vdom
vdom 是通过 children 关联子节点，而 fiber 通过 child、sibling、return 关联了父节点、子节点、兄弟节点
从 vdom 转 fiber 的过程叫做 reconcile，这个过程还会创建用到的 dom 节点，并且打上增删改的标记
这个 reconcile 的过程叫做 render 阶段
之后 commit 阶段会根据标记来增删改 dom
commit 阶段也分为了 3 个小阶段，before mutation、mutation、layout
mutation 阶段会增删改 dom，before mutation 是在 dom 操作之前，layout 是在 dom 操作之后
所以 ref 的更新是在 layout 阶段。useEffect 和 useLayoutEffect 的回调也都是在 layout 阶段执行的，只不过 useLayoutEffect 的回调是同步执行，而 useEffect 的回调是异步执行
React 整体的渲染流程就是 render（reconcile 的过程） + commit（执行增删改 dom 和 effect、生命周期函数的执行、ref 的更新等）
当你 setState 之后，就会触发一次渲染的流程，也就是 render + commit
当然，除了 setState 之外，入口处的 ReactDOM.render 还有函数组件里的 useState 也都能触发渲染

2、同步和并发
workLoop
React 18 里实现了这样一套并发的机制，这里的重要程度就是优先级，也就是基于优先级的可打断的渲染流程。
React 会把 vdom 树转成 fiber 链表，因为 vdom 里只有 children，没有 parent、sibling 信息，而 fiber 节点里有，这样就算打断了也可以找到下一个节点继续处理。fiber 结构就是为实现并发而准备的。
按照 child、sibling、sibling、return、sibling、return 之类的遍历顺序，可以把整个 vdom 树变成线性的链表结构，一个循环就可以处理完。
循环处理每个 fiber 节点的时候，有个指针记录着当前的 fiber 节点，叫做 workInProgress。
```
function workLoopSync() {
  while(workInProgress != null) {
    performUnitOfWork(workInProgress)
  }
}
```

特殊的，在并发模式下：
并发是通过交替执行来实现的，就是在循环里多了个打断和恢复的机制
```
function workLoopConcurrent() {
  while(workInProgress != null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}
```
每处理一个 fiber 节点，都判断下是否打断，shouldYield 返回 true 的时候就终止这次循环
每次 setState 引起的渲染都是由 Scheduler 调度执行的，它维护了一个任务队列，上个任务执行完执行下个
没渲染完的话，再加一个新任务进去
判断是否是被中断的还是已经渲染完了，这个也很简单，当全部 fiber 节点都渲染完，那 workInProgress 的指针就是 null 了。
而如果是渲染到一半 yield 的，那 workInProgress 就不是 null。
所以可以这样根据 workInProgress 是否是 null 判断是否是中断了
```
if(workInProgress != null) {
  markRenderYielded();
  return RootInProgress;
}
```
然后把剩下的节点 schedule 就好了。当再次 schedule 到这个任务，就会继续渲染。
这就是并发模式的实现，也就是在 workLoop 里通过 shouldYield 的判断来打断渲染，之后把剩下的节点加入 Schedule 调度，来恢复渲染。

关于shouldYield
shouldYield是根据过期时间，每次开始处理时记录个时间，如果处理完这个 fiber 节点，时间超了，那就打断。
关于优先级
时间分片：优先级高低会影响 Scheduler 里的 taskQueue 的排序结果，但打断只会根据过期时间

总结
react 的并发模式的打断只会根据时间片，也就是每 5ms 就打断一次，并不会根据优先级来打断，优先级只会影响任务队列的任务排序

3、react 里的优先级
1 ImmediatePriority 离散的一些事件，比如 click、keydown、input
2 UserBlockingPriority 是连续的一些事件，比如 scroll、drag、mouseover
3 NormalPriority  正常的异步任务
4 LowPriority
5 IdlePriority

Scheduler 会根据任务的优先级对任务排序来调度
并发模式下不同的 setState 的优先级不同，就是通过指定 Scheduler 的优先级实现的

但在 React 里优先级不是直接用这个
因为 Scheduler 是分离的一个包了，它的优先级机制也是独立的
而且 React 有自己的一套优先级机制，那个分类可不止上面这 5 种，足足有 31 种，React 的那套优先级机制叫做 Lane
react 是通过二机制的方式来保存不同优先级

除了 react 的 lane 的优先级机制外，react 还给事件也区分了优先级：
DiscreteEventPriority 离散事件优先级
ContinuousEventPriority 连续事件优先级
DefaultEventPriority 默认事件优先级
IdleEventPriority 空闲时间优先级
事件的优先级会转化为 react 的 Lane 优先级，Lane 的优先级也可以转化为事件优先级。

react 通过 Scheduler 调度任务的时候，先把 Lane 转换为事件优先级，然后再转为 Scheduler 优先级。
因为 Lane 的优先级有 31 个啊，而事件优先级那 4 个刚好和 Scheduler 的优先级对上

4、useTransition、useDeferredValue
react18 里同时存在着这两种循环方式，普通的循环和带时间分片的循环。
也不是所有的特性都要时间分片，只有部分需要。
那就如果这次 setState 更新里包含了并发特性，就是用 workLoopConcurrent，否则走 workLooSync 就好了。
react 会根据 lane 来判断是否要开启时间分片。
所有能设置开启时间分片的 lane 的 api 都是基于并发的 api。
比如 startTransition、useTransition、useDeferredValue 这些。

startTransition 的 api：

```
import React, { useTransition, useState } from "react";

export default function App() {
  const [text, setText] = useState('guang');
  const [text2, setText2] = useState('guang2');

  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      setText('dong');
    });

    setText2('dong2');
  }

  return (
    <button onClick={handleClick}>{text}{text2}</button>
  );
}
```
比如上面有两个 setState，其中一个优先级高，另一个优先级低，那就把低的那个用 startTransition 包裹起来。
就可以实现高优先级的那个优先渲染。
源码里是在调用回调函数之前设置了更新的优先级为 ContinuousEvent 的优先级，也就是连续事件优先级，比 DiscreteEvent 离散事件优先级更低，所以会比另一个 setState 触发的渲染的优先级低，在调度的时候排在后面
那渲染的时候就会走 workLoopConcurrent 的带时间分片的循环，然后通过 Scheduler 对任务按照优先级排序，就实现了高优先级的渲染先执行的效果。

useDeferredValue 的 api:
```
function App() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input value={text} onChange={handleChange}/>
      <List text={text}/>
    </div>
  );
};
```
List 里是根据输入的 text 来过滤结果展示的，现在每次输入都会触发渲染。
我们希望在内容输入完了再处理通知 List 渲染，就可以这样：
```
function App() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input value={text} onChange={handleChange}/>
      <List text={deferredText}/>
    </div>
  );
};
function 
```
对 state 用 useDeferredValue 包裹之后，新的 state 就会放到下一次更新。
react 17 里就是通过 useEffect 把这个值的更新时机延后了
也就是其他的 setState 触发的 render 处理完了之后，在 commit 阶段去 setState，这就是 DeferedValue 的意思。
react 18 里也有这个 api，虽然功能一样，但实现变了，现在是基于并发模式的，通过 Lane 的优先级实现的延后更新。
这俩都是基于并发机制，也就是基于 Lane 的优先级实现的 api。当用到这些 api 的时候，react 才会启用 workLoopConcurrent 带时间分片的循环。

总结：
react 的渲染流程是 render + commit。render 阶段实现 vdom 转 fiber 的 reconcile，之后 commit 阶段执行增删改 dom，更新 ref、调用 effect 回调和生命周期函数等。
多次 setState 会引起多个渲染流程，这之间可能有重要程度的不同，也就是优先级的不同。
为了让高优先级的更新能先渲染，react 实现了并发模式。
同步模式是循环处理 fiber 节点，并发模式多了个 shouldYield 的判断，每 5ms 打断一次，也就是时间分片。并且之后会重新调度渲染。
通过这种打断和恢复的方式实现了并发。
然后 Scheduler 可以根据优先级来对任务排序，这样就可以实现高优先级的更新先执行。
react 里有 Lane 的优先级机制，基于二进制设计的。它和事件的优先级机制、Scheduler 的优先级机制能够对应上。调度任务的时候先把 Lane 转事件优先级，然后转 Scheduler 的优先级。
react18 的 useTransition、useDeferredValue 都是基于并发特性实现的，useTransition 是把回调函数里的更新设置为连续事件的优先级，比离散事件的优先级低。useDeferredValue 则是延后更新 state 的值。
这些并发特性的 api 都是通过设置 Lane 实现的，react 检测到对应的 Lane 就会开启带有时间分片的 workLoopConcurrent 循环。
时间分片的 workLoop + 优先级调度，这就是 React 并发机制的实现原理。这就是 React 并发机制的实现原理。
