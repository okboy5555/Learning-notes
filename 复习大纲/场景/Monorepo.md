参考：https://segmentfault.com/a/1190000019309820

指在一个项目仓库 (repo) 中管理多个模块/包 (package)

monorepo 最主要的好处是统一的工作流和Code Sharing。比如我想看一个 pacakge 的代码、了解某段逻辑，不需要找它的 repo，直接就在当前 repo；当某个需求要修改多个 pacakge 时，不需要分别到各自的 repo 进行修改、测试、发版或者 npm link，直接在当前 repo 修改，统一测试、统一发版。只要搭建一套脚手架，就能管理（构建、测试、发布）多个 package

不好的方面则主要是 repo 的体积较大。特别是，因为各个 package 理论上都是独立的，所以每个 package 都维护着自己的 dependencies，而很大的可能性，package 之间有不少相同的依赖，而这就可能使install时出现重复安装，使本来就很大的 node_modues 继续膨胀。

基于对以上的理解，我认为当项目到一定的复杂度，需要且可以划分模块、但模块间联系紧密的，比较适合用 monorepo 组织代码。

目前最常见的 monorepo 解决方案是 Lerna 和 yarn 的 workspaces 特性。其中，lerna 是一个独立的包。

上面提到的 Babel, create-react-app 等都是用 lerna 进行管理的。在项目 repo 中以lerna.json声明 packages 后，lerna 为项目提供了统一的 repo 依赖安装 (lerna bootstrap)，统一的执行 package scripts (lerna run)，统一的 npm 发版 (lerna publish) 等特性。对于「依赖爆炸」的问题，lerna 在安装依赖时提供了--hoist选项，相同的依赖，会「提升」到 repo 根目录下安装，lerna 直接以字符串对比 dependency 的版本号，完全相同才提升，semver 约定在这并不起作用。


而使用 yarn 作为包管理器的同学，可以在 package.json 中以 workspaces 字段声明 packages，yarn 就会以 monorepo 的方式管理 packages。相比 lerna，yarn 突出的是对依赖的管理，包括 packages 的相互依赖、packages 对第三方的依赖，yarn 会以 semver 约定来分析 dependencies 的版本，安装依赖时更快、占用体积更小；但欠缺了「统一工作流」方面的实现。

lerna 和 yarn-workspace 并不是只能选其一，大多 monorepo 即会使用 lerna 又会在 package.json 声明 workspaces。这样的话，无论你的包管理器是 npm 还是 yarn，都能发挥 monorepo 的优势；要是包管理是 yarn ，lerna 就会把依赖安装交给 yarn 处理。


匹配相关仓库：
micromatch
https://github.com/micromatch