https://juejin.cn/post/6844903779712630797#heading-1（图）


module resolve 流程用于获得各 loader 和模块的绝对路径等信息。
在 resolver钩子里，先通过 enhanced-resolve 获取 loaderResolver，提供 resolve 方法
在 defaultResolve 方法里，获取 normalResolver, 提供 resolve 方法。
解析 unresolvedResource，得到文件的绝对路径等信息
根据rules得到 loader
使用 loaderResolver 得到loader的绝对路径等信息
合并 loader, 拼接数据，
调用 NormalModuleFactory的afterResolve钩子，结束 resolve 流程。

参考：https://segmentfault.com/a/1190000040856062