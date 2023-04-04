组件及生命周期

编写一个组件 hy-button，并在 index 中引用。

安装 classname，proptypes 依赖

测试在组件中，编写页面的生命周期。



跨端兼容方案。

两种方案：

方案一：内置环境变量。

创建 cross-platform 页面。

环境变量 process.env 不能被解构。



方案二：统一接口的多端文件。

创建 hy-multi-button 页面，在 cross-platform 页面中引用。

默认形式（与平台无关的）组件 index.jsx 是必须的。

新建工具 set-title



Redux 状态管理

使用 RTK，安装 redux 和 rtk。

创建 home store

使用 `<Provider>` 组件，提供 store。

创建 redux 页面，使用函数式组件。

测试派发同步 action 和异步 action，使用 extraReducers



卷皮项目。

创建项目 juanpi

安装依赖。

App.jsx 保留类组件，index.jsx 改为函数式组件，并改为 home 页面。

在 project.config.json 中，配置小程序的 appid。

