浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。

其中libuv引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。
timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
idle, prepare 阶段：仅node内部使用
poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
check 阶段：执行 setImmediate() 的回调
close callbacks 阶段：执行 socket 的 close 事件回调
