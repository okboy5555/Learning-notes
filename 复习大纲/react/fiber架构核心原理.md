Fiber的更新过程 :
reconciliation和commit
reconciliation阶段
第一部分从 ReactDOM.render() 方法开始，把接收的React Element转换为Fiber节点，并为其设置优先级，记录update等。这部分主要是一些数据方面的准备工作。
第二部分主要是三个函数：scheduleWork、requestWork、performWork，即安排工作、申请工作、正式工作三部曲。React 16 新增的异步调用的功能则在这部分实现。
第三部分是一个大循环，遍历所有的Fiber节点，通过Diff算法计算所有更新工作，产出 EffectList 给到commit阶段使用。这部分的核心是 beginWork 函数。

commit阶段
这个阶段主要做的工作拿到reconciliation阶段产出的所有更新工作，提交这些工作并调用渲染模块（react-dom）渲染UI。完成UI渲染之后，会调用剩余的生命周期函数，所以异常处理也会在这部分进行

分配优先级
fiber结构中有个expirationTime
```
// 源码中的priorityLevel优先级划分
export const NoWork = 0;
// 仅仅比Never高一点 为了保证连续必须完整完成
export const Never = 1;
export const Idle = 2;
export const Sync = MAX_SIGNED_31_BIT_INT;//整型最大数值，是V8中针对32位系统所设置的最大值
export const Batched = Sync - 1;
 case ImmediatePriority:
  expirationTime = Sync;
  break;
  //高优先级 如由用户输入设计交互的任务
case UserBlockingPriority:
  expirationTime = computeInteractiveExpiration(currentTime);
  break;
  // 正常的异步任务
case NormalPriority:
  // This is a normal, concurrent update
  expirationTime = computeAsyncExpiration(currentTime);
  break;
case LowPriority:
case IdlePriority:
  expirationTime = Never;
  break;
default:
  invariant(
    false,
    'Unknown priority level. This error is likely caused by a bug in ' +
      'React. Please file an issue.',
  );
```
源码中的computeExpirationForFiber函数，该方法用于计算fiber更新任务的最晚执行时间，进行比较后，决定是否继续做下一个任务

简单来说，最终结果是以25为单位向上增加的，比如说我们输入102 - 126之间，最终得到的结果都是625，但是到了127得到的结果就是650了，这就是除以25取整的效果。

即计算出的React低优先级update的expirationTime间隔是25ms， React让两个相近（25ms内）的update得到相同的expirationTime，目的就是让这两个update自动合并成一个Update，从而达到批量更新的目的

执行优先级
requestIdleCallback和requestAnimationFrame
requestIdleCallback：
在浏览器空闲时段内调用的函数排队。是开发人员可以在主事件循环上执行后台和低优先级工作而不会影响延迟关键事件，如动画和输入响应。
其在回调参数中IdleDeadline可以获取到当前帧剩余的时间。利用这个信息可以合理的安排当前帧需要做的事情，如果时间足够，那继续做下一个任务，如果时间不够就歇一歇。
requestAnimationFrame：告诉浏览器你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画

Fiber所做的就是需要分解渲染任务，然后根据优先级使用API调度，异步执行指定任务：
低优先级任务由requestIdleCallback处理，限制任务执行时间，以切分任务，同时避免任务长时间执行，阻塞UI渲染而导致掉帧。
高优先级任务，如动画相关的由requestAnimationFrame处理；
并不是所有的浏览器都支持requestIdleCallback，但是React内部实现了自己的polyfill，所以不必担心浏览器兼容性问题。polyfill实现主要是通过rAF+postmessage实现的(最新版本去掉了rAF


fiber中最为重要的是return、child、sibling指针，连接父子兄弟节点以构成一颗单链表fiber树，其扁平化的单链表结构的特点将以往递归遍历改为了循环遍历，实现深度优先遍历。

current与workInProgress
current树：React 在 render 第一次渲染时，会通过 React.createElement 创建一颗 Element 树，可以称之为 Virtual DOM Tree，由于要记录上下文信息，加入了 Fiber，每一个 Element 会对应一个 Fiber Node，将 Fiber Node 链接起来的结构成为 Fiber Tree。它反映了用于渲染 UI 和映射应用状态。这棵树通常被称为 current 树（当前树，记录当前页面的状态）。

workInProgress树：当React经过current当前树时，对于每一个先存在的fiber节点，它都会创建一个替代（alternate）节点，这些节点组成了workInProgress树。这个节点是使用render方法返回的React元素的数据创建的。一旦更新处理完以及所有相关工作完成，React就有一颗替代树来准备刷新屏幕。一旦这颗workInProgress树渲染（render）在屏幕上，它便成了当前树。下次进来会把current状态复制到WIP上，进行交互复用，而不用每次更新的时候都创建一个新的对象，消耗性能。这种同时缓存两棵树进行引用替换的技术被称为双缓冲技术。

alternate fiber可以理解为一个fiber版本池，用于交替记录组件更新（切分任务后变成多阶段更新）过程中fiber的更新，因为在组件更新的各阶段，更新前及更新过程中fiber状态并不一致，在需要恢复时（如发生冲突），即可使用另一者直接回退至上一版本fiber。

可以比作Git 功能分支，你可以将 WIP 树想象成从旧树中 Fork 出来的功能分支，你在这新分支中添加或移除特性，即使是操作失误也不会影响旧的分支。当你这个分支经过了测试和完善，就可以合并到旧分支，将其替换掉。

