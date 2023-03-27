创建一个新的项目 02-shopping-street

在项目中安装 vue-lazy 依赖。

在 static 目录下，存放图片。

- 小程序中仅支持 base64 和网络图片。

新建 style 目录，存放全局样式。将 css 目录从 statci 目录下，移动到i根目录1，这样 HBuilderX 会进行编译。



搭建目录结构

新建 home、category、cart、profile 页面。

配置每个页面头部的标题名称和背景颜色。

配置 tabbar。



封装网络请求。

封装请求轮播图的网络请求。



在 home 中发送获取轮播图的网络请求。



在项目中集成 Pinia。

创建 home store 模块。

创建 action，发送网络请求，将轮播图和推荐数据保存到 store 在。

在 home.vue 中，派发 action 获取轮播图和推荐数据。



封装轮播图组件，在 home.vue 中展示。

点击轮播图。实现跳转。

新建一个 webview.vue 页面，跳转后来到该页面。接收链接，展示页面。



封装推荐组件，在 home.vue 中展示。

scss 样式的抽取。



封装热门组件，在 home.vue 中展示。

在其中展示图片。

> 在 css 中引用背景图片，才需要放到 static 根目录，这样才能自动编译成 base63 格式。



封装选项卡组件，在 home.vue 中使用。

点击切换选项卡。