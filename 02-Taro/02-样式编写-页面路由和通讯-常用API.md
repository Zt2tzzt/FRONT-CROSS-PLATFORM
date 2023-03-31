设计稿及尺寸单位选择。

在 02-style-taro 中，测试尺寸的转换。

通常会把不需要转换的单位，抽取到一个文件中。no-transform-unit.scss



css编译时忽略

在该文件上添加注释，组织单位转换。之后不需要用大写了。

测试 js 代码中的尺寸样式转换。



全局和局部样式

styles-components 在小程序中无效，要用林一种 CSS IN JS 方案，参考文档。

项目中用 CSS Modules 方案。

改 config/index.js 中的配置，启用 H5 和小程序的 CSS Modules。

新建 index.module.less

按照嵌套来写。

在 CSS Modules 中，如何编写全局样式，使用 global



背景图片。

在 config/index.js 中配置。



字体图标



新建 Page 页面

创建 home, category, cart, profile 四个页面。



配置 tabbar



页面路由

创建 detail01 页面，进行测试。从 home 跳转到 detail01.



页面通讯

EventChanel 方式，仅适配小程序。

this.$instance.page.getOpenerEventChannel()

this.$instance.page = Taro.getCurrentPage()

在 detail02 中，测试逆向传递数据。



全局事件总线。



> Taro 和 uni-app 的编程范式是类似的，只有语法和兼容性不同



页面的生命周期



Hooks 生命周期

通过实例拿页面参数，实例用 ref 引用。



网络请求封装。



数据存储

