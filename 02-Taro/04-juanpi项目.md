1.创建项目 `02-juanpi`

---

2.安装依赖。

-  @reduxjs/toolkit 
-  react-redux 
-  classnames
-  proptypes

---

3.基本配置

在 `config/index.js` 中，

配置项目路径别名（参考前文配置）

启用 webpack 持久化缓存配置。

小程序、h5 段，启用 css modules；

小程序引入本地文件，自动转 base64，最大文件大小配置。

---

消除项目配置文件中的报错（参考前文配置）。

在 `project.config.json` 中，配置小程序的 appid。

---

4.资源引入

引入图片 image 和 css 样式资源。

---

4.页面创建

App.jsx 保留类组件，其它页面或组件，改为函数式组件形式，

创建 home ，category，cart，profile 页面。

在 app.config.js 中，

配置窗口 window（仅在小程序中有效）

配置 tabbar。

重启项目服务。

---

在 home 中，创建 home-search 组件。

编写内容和样式。

---

将之前封装好的网络请求放入项目中。

封装 getHomeInfoData 网络请求。

---

使用 redux 创建 store，

创建 home reducer。

在其中创建 getHomeInfoData 网络请求对应的异步 action。

---

在 home 中，派发 action

---

在 home reducer 中，封装 fetchHomeRecommendDataAction 异步 action。在 store 中，保存 recommends 和 populars 数据。

在 home 中，派发该 action。获取到 recommends 和 populars 数据。

---

在 home 中，创建 home-banner 组件。用于展示轮播图。

---

在 home 中，创建 home-popular 组件，用于编写热门区域的四张图片。

---

在 home 中，创建 home-recommend 组件，用于展示推荐区域的六张图片。

---

在 home 中，编写下方商品列表区域：

创建 tab-control 组件，用于展示选项卡。

---

封装获取商品列表的网络请求，并在 home reducer 中，封装异步的 action

在 home 中派发 action。将“精选专场”和“精选单品”的商品数据，保存到 store 中 `goodList`。

动态生成 `goodList`。

---

在 home 中，创建 grid-view 组件，用于展示商品列表。

在 grid-view 中，创建 grid-item 组件，用于展示商品 item。

---

在 home reducer 中，维护一个 currentTab 状态。

在 home 中，监听 tab-control 点击，改变 currentTab 状态和商品列表数据。

---

在 home 中，监听触底事件，加载下一页商品数据。

---

创建 detail 页面。

在 grid-view-item 中，监听商品 item 点击，跳转到 detail 页面，并传递 WebView 的 url。

---

项目打包部署

修改 config/index.js 中的配置。

微信小程序，还要修改 project.config.json 中的配置。