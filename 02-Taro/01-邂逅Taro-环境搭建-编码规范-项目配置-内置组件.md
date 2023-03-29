用 Vue 只能开发 H5、小程序

用 React 还可以借助 ReactNative 开发 APP 端。

一般用 uni-app，也是用来开发小程序，很少有多端兼容的需求。



Taro 是什么？



跨平台发展趋势：

IphoneGap Cordova

2015，React Native -> React

2016，Weex -> Vue

2017，Flutter

2017，weixin-miniapp，uni-app

2018，Taro



Taro 的历史版本。



Taro 的特点：

官方健仪：使用 Taro 开发 RN 应用前，先学习 RN 框架。

Taro UI 是 Taro 提供的一个 UI 框架。仅支持 weapp、h5 的适配。



Taro 对比 uni-app

跨域支持（仅供参考），在不断完善。、

如何选择？



Taro 架构理解



开发工具选择



Taro 安装



Taro 项目初始化。

注意事项



Taro 项目编译运行

运行项目到 h5 端：

- 通过注释，解决 eslint 报错。或者在 `.eslintrc` 里配置 global。

运行项目到小程序端：

- 需要手动打开小程序，并指定目录（dist 文件夹下



项目目录结构分析

app.config.json 相当于 uni-app 的 pages.json，小程序的 app.json



Taro + React 开发规范



Webpack 编译配置

在 config\index.js 定义常量

```json
defineConstants: {
  VERSION: "'1.0.0'"
},
```

在 config\index.js 中配置别名。

```js
import path from 'path'

const config = {
  alias: {
    "@": path.resolve(__dirname, "..", "src")
  }
}
```



全局配置文件

h5 端大多不支持。



页面配置文件



项目配置



入口组件 app.js

测试神明周期。

定义全局数据。在 app.js 中，获取。

在 aoo,kess 中，编写全局样式。



常用内置组件

Taro UI 组件库介绍，按需引入。

编写一个页面，在自重使用组件，组件都要导包。

在 app.config.json 中，注册该页面。

`<Image>` 组件不支持路径引用本地图片，只能导入。

- h5 用的是图片本身大小，小程序端有默认宽高。

