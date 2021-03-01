浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。

Node 的 Event Loop 分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段

其中 libuv 引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。
timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
idle, prepare 阶段：仅 node 内部使用
poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
check 阶段：执行 setImmediate() 的回调
close callbacks 阶段：执行 socket 的 close 事件回调

进程与线程区别？JS 单线程带来的好处？
进程描述了 CPU 在运行指令及加载和保存上下文所需的时间，放在应用上来说就代表了一个程序。线程是进程中的更小单位，描述了执行一段指令所需的时间
把这些概念拿到浏览器中来说，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁
在 JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是互斥的。这其中的原因是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI。这其实也是一个单线程的好处，得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题的好处。当然前面两点在服务端中更容易体现，对于锁的问题，形象的来说就是当我读取一个数字 15 的时候，同时有两个操作对数字进行了加减，这时候结果就出现了错误。解决这个问题也不难，只需要在读取的时候加锁，直到读取完毕之前都不能进行写入操作。

执行栈
把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则

Event Loop 执行顺序
首先执行同步代码，这属于宏任务
当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
执行所有微任务
当执行完所有微任务后，如有必要会渲染页面
然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数


node 中的 process.nextTick
Node 中的 process.nextTick，这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行



浏览器：
macro-task（宏任务） 大概包括：

script（整体代码）
setTimeout
setInterval
setImmediate
I / O
UI render
micro-task（微任务） 大概包括：

process.nextTick
Promise.then
async / await （等价于 Promise.then）
MutationObserver（HTML5 新特性）


总体结论就是：
执行宏任务
然后执行宏任务产生的微任务
若微任务在执行过程中产生了新的微任务，则继续执行微任务
微任务执行完毕，再回到宏任务中进行下一轮循环


我们知道 async 会隐式返回一个 Promise 作为结果的函数，那么可以简单理解为：await 后面的函数在执行完毕后，await 会产生一个微任务（Promise.then 是微任务）。但是我们要注意微任务产生的时机，它是执行完 await 后，直接跳出 async 函数，执行其他代码（此处就是协程的运作，A暂停执行，控制权交给B）。其他代码执行完毕后，再回到 async 函数去执行剩下的代码，然后把 await 后面的代码注册到微任务队列中
但是这种做法其实违反了规范，但是规范也可以更改的
新版的 chrome 优化了await 的执行速度，await 变得更早执行了

node：

macro-task（宏任务）包括：

setTimeout
setInterval
setImmediate
script（整体代码）
I / O 操作
micro-task（微任务）包括：

process.nextTick（与普通微任务有区别，在微任务队列执行之前执行）
Promise.then 回调

timers
timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。同样，在 Node 中定时器指定的时间也不是准确时间，只是尽快执行。

poll
如果当前已经存在定时器，而且有定期到时间了，拿出来执行，事件循环将会到 timers 阶段

如果没有定时器，回去看回调函数队列
如果 poll 队列不为空，会遍历回到队列并同步执行，直到队列为空或达到系统限制
如果 poll 队列为空，会有两件事发生
如果 setImmediate 回调需要执行，poll 阶段将会停止并进入 check 阶段执行回调
如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置，防止一直等待下去，一段时间后自动进入 check 阶段

check
check 阶段，这是一个比较简单的阶段，直接执行 setImmediate 的回调
