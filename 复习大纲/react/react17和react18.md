React 17 仅支持对浏览器事件和 Hooks 进行批处理。因此，状态更新只发生在异步操作中。
React 18 处理组件重新渲染的方式是一种改进。React 17 有一个空白，非浏览器事件没有被批处理。React 18 填补了这一空白，并通过减少不必要的重新渲染来提高应用程序性能


<!-- flushSync -->

React 17.0变化

事件委托的变更，React 不会再将事件处理添加到 document 上，而是将事件处理添加到渲染 React 树的根 DOM 容器中， 在 React 16 及之前版本中，React 会对大多数事件进行 document.addEventListener() 操作。React v17 开始会通过调用 rootNode.addEventListener() 来代替. 解决微应用不同版本的react的兼容，


新版本的jsx-runtime
import {jsx as _jsx} from 'react/jsx-runtime';

减小包装尺寸,直接引用子模块，防止不同版本的react的情况，减少动态属性查找React.createElement

事件池复用机制的移除

因为在React采取了一个事件池的概念，每次我们用的事件源对象，在事件函数执行之后，可以通过releaseTopLevelCallbackBookKeeping等方法将事件源对象释放到事件池中，这样的好处每次我们不必再创建事件源对象，可以从事件池中取出一个事件源对象进行复用，在事件处理函数执行完毕后,会释放事件源到事件池中，清空属性，这就是setTimeout中打印为什么是null的原因了
事件池复用机制会导致事件内同步异步表现不一致
这种处理对性能优化微乎其微
```
handerClick = (e) => { 
    console.log(e.target) // button 
    setTimeout(()=>{ 
    console.log(e.target) // null
    },0)
}
```

React 18.0变化

ReactDOM.createRoot()代替ReactDOM.render()

这个方法主要是防止 React 18 的不兼容更新导致你的应用程序崩溃
当你更新到 React 18 时，如果你还使用 redner 函数作为程序入口，控制台会打印一个错误日志来提醒你使用 createRoot() ，只有使用了这个方法后才能使用 React 18 新功能

自动批处理

原生事件和setTimeout等方法里面的setState和周期、合成事件中的表现不一样，React 18 版本解决了这个问题，无论你是在 Promise、setTimeout、或者其他异步回调中更新状态，都会触发批处理
我们还可以使用 ReactDOM.flushSync() 退出批处理
```
import { flushSync } from 'react-dom'
function handleClick() { 
    flushSync(() => {
        setCounter(c => c + 1);
    });// React has updated the DOM by now
    flushSync(() => {
        setFlag(f => !f); 
    }); // React has updated the DOM by now
}
```
startTransition自定义非紧急任务
个人感觉跟react native的 InteractionManager 非常类似
官方工作组两个应用场景提出了：

慢速渲染：React 需要执行大量计算，以便过渡UI来显示结果。(如搜索引擎的关键词联想)
慢速网络：React 正在等待来自网络的某些数据。这种用例与 Suspense 紧密集成。(懒加载)
```
// APP.js
import "./styles.css";
import { useState, startTransition } from "react";

export default function App() {
  let [value, setValue] = useState(0);

  const onChange = (event) => {
    startTransition(() => {
      setValue(event.target.value);
      console.log(event.target.value);
    });
  };

  return (
    <div className="App">
      <input value={value} onChange={onChange} />
      <div>{value}</div>
    </div>
  );
}
```

服务端支持suspense组件
场景:
在前端开发中，经常会有这样的需求，加载某个界面时，如果界面的资源比较大，前端对数据的处理也需要时间，加载比较慢，这时候我们需要用一个加载动画或者提示，使得交互更加友好。

React 重写的新 Facebook.com 是用 Hermes 做 SSR 来优化首屏渲染得，但是传统 SSR 的一个问题是，全量渲染话延迟太高了。而 CM + Suspence 就可以做到用 Suspence boundary 将应用分片，然后以此为单位做流式 SSR，有点像BigPipe 
参考：
https://juejin.cn/post/7109710400089751559
