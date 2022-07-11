用法
// 懒加载组件切换时显示过渡组件
```
const ProfilePage = React.lazy(() => import('./ProfilePage')); // Lazy-loaded

// Show a spinner while the profile is loading
<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```
// 异步获取数据
```
import { unstable_createResource } from 'react-cache'

const resource = unstable_createResource((id) => {
  return fetch(`/demo/${id}`)
})

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```
在render函数中，我们可以写入一个异步请求，请求数据
react会从我们缓存中读取这个缓存
如果有缓存了，直接进行正常的render
如果没有缓存，那么会抛出一个异常，这个异常是一个promise
当这个promise完成后（请求数据完成），react会继续回到原来的render中（实际上是重新执行一遍render），把数据render出来
完全同步写法，没有任何异步callback之类的东西
如果你还没有明白这是什么意思那我简单的表述成下面这句话：

调用render函数->发现有异步请求->悬停，等待异步请求结果->再渲染展示数据

看着是非常神奇的，用同步方法写异步，而且没有yield/async/await，简直能把人看傻眼了。这么做的好处自然就是，我们的思维逻辑非常的简单，清楚，没有callback，没有其他任何玩意，不能不说，看似优雅了非常多而且牛逼。

官方文档指出它还将提供官方的方法进行数据获取

原理
看一下react提供的unstable_createResource源码
```
export function unstable_createResource(fetch, maybeHashInput) {
  const resource = {
    read(input) {
      ...
      const result = accessResult(resource, fetch, input, key);
      switch (result.status) {
        // 还未完成直接抛出自身promise
        case Pending: {
          const suspender = result.value;
          throw suspender;
        }
        case Resolved: {
          const value = result.value;
          return value;
        }
        case Rejected: {
          const error = result.value;
          throw error;
        }
        default:
          // Should be unreachable
          return (undefined: any);
      }
    },
  };
  return resource;
}
```
为此，React使用Promises。
组件可以在其render方法（或在组件的渲染过程中调用的任何东西，例如新的静态getDerivedStateFromProps）中抛出Promise。
React捕获了抛出的Promise，并在树上寻找最接近的Suspense组件，Suspense其本身具有componentDidCatch，将promise当成error捕获，等待其执行完成其更改状态重新渲染子组件。

Suspense组件将一个元素（fallback 作为其后备道具，无论子节点在何处或为什么挂起，都会在其子树被挂起时进行渲染。

如何达成异常捕获
reconciliation阶段的 renderRoot 函数，对应异常处理方法是 throwException
commit阶段的 commitRoot 函数，对应异常处理方法是 dispatch
reconciliation阶段的异常捕获
react-reconciler中的performConcurrentWorkOnRoot

```
// This is the entry point for every concurrent task, i.e. anything that
// goes through Scheduler.
// 这里是每一个通过Scheduler的concurrent任务的入口
function performConcurrentWorkOnRoot(root, didTimeout) {
    ...
    do {
        try {
            //开始执行Concurrent任务直到Scheduler要求我们让步
            workLoopConcurrent();
            break;
        } catch (thrownValue) {
            handleError(root, thrownValue);
        }
    } while (true);
    ...
}

function handleError(root, thrownValue) {
    ...
      throwException(
        root,
        workInProgress.return,
        workInProgress,
        thrownValue,
        renderExpirationTime,
      );
      workInProgress = completeUnitOfWork(workInProgress);
   ...
}
throwException

do {
    switch (workInProgress.tag) {
      ....
      case ClassComponent:
        // Capture and retry
        const errorInfo = value;
        const ctor = workInProgress.type;
        const instance = workInProgress.stateNode;
        if (
          (workInProgress.effectTag & DidCapture) === NoEffect &&
          (typeof ctor.getDerivedStateFromError === 'function' ||
            (instance !== null &&
              typeof instance.componentDidCatch === 'function' &&
              !isAlreadyFailedLegacyErrorBoundary(instance)))
        ) {
          workInProgress.effectTag |= ShouldCapture;
          workInProgress.expirationTime = renderExpirationTime;
          // Schedule the error boundary to re-render using updated state
          const update = createClassErrorUpdate(
            workInProgress,
            errorInfo,
            renderExpirationTime,
          );
          enqueueCapturedUpdate(workInProgress, update);
          return;
        }
    }
    ...
}
```
    
throwException函数分为两部分
1、遍历当前异常节点的所有父节点，找到对应的错误信息（错误名称、调用栈等），这部分代码在上面中没有展示出来

2、第二部分是遍历当前异常节点的所有父节点，判断各节点的类型，主要还是上面提到的两种类型，这里重点讲ClassComponent类型，判断该节点是否是异常边界组件（通过判断是否存在componentDidCatch生命周期函数等），如果是找到异常边界组件，则调用 createClassErrorUpdate函数新建update，并将此update放入此节点的异常更新队列中，在后续更新中，会更新此队列中的更新工作

commit阶段
ReactFiberWorkLoop中的finishConcurrentRender=》
commitRoot=》
commitRootImpl=》captureCommitPhaseError

commit被分为几个子阶段，每个阶段都try catch调用了一次captureCommitPhaseError

突变(mutate)前阶段：我们在突变前先读出主树的状态，getSnapshotBeforeUpdate在这里被调用
突变阶段：我们在这个阶段更改主树，完成WIP树转变为current树
样式阶段：调用从被更改后主树读取的effect
```
export function captureCommitPhaseError(sourceFiber: Fiber, error: mixed) {
  if (sourceFiber.tag === HostRoot) {
    // Error was thrown at the root. There is no parent, so the root
    // itself should capture it.
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
    return;
  }

  let fiber = sourceFiber.return;
  while (fiber !== null) {
    if (fiber.tag === HostRoot) {
      captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
      return;
    } else if (fiber.tag === ClassComponent) {
      const ctor = fiber.type;
      const instance = fiber.stateNode;
      if (
        typeof ctor.getDerivedStateFromError === 'function' ||
        (typeof instance.componentDidCatch === 'function' &&
          !isAlreadyFailedLegacyErrorBoundary(instance))
      ) {
        const errorInfo = createCapturedValue(error, sourceFiber);
        const update = createClassErrorUpdate(
          fiber,
          errorInfo,
          // TODO: This is always sync
          Sync,
        );
        enqueueUpdate(fiber, update);
        const root = markUpdateTimeFromFiberToRoot(fiber, Sync);
        if (root !== null) {
          ensureRootIsScheduled(root);
          schedulePendingInteractions(root, Sync);
        }
        return;
      }
    }
    fiber = fiber.return;
  }
}
```
captureCommitPhaseError函数做的事情和上部分的 throwException 类似，遍历当前异常节点的所有父节点，找到异常边界组件（有componentDidCatch生命周期函数的组件），新建update，在update.callback中调用组件的componentDidCatch生命周期函数。

throwException 和 captureCommitPhaseError在遍历节点时，是从异常节点的父节点开始遍历，所以异常捕获一般由拥有componentDidCatch或getDerivedStateFromError的异常边界组件进行包裹，而其是无法捕获并处理自身的报错。