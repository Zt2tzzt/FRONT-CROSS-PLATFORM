1.创建项目 `02-juanpi`



2.安装依赖。

-  @reduxjs/toolkit 
-  react-redux 
-  classnames
-  proptypes



3.基本配置

在 `config/index.js` 中，

配置项目路径别名（参考前文配置）

启用 webpack 持久化缓存配置。

小程序、h5 段，启用 css modules；

小程序引入本地文件，自动转 base64，最大文件大小配置。



消除项目配置文件中的报错（参考前文配置）。

在 `project.config.json` 中，配置小程序的 appid。



4.资源引入

引入图片 image 和 css 样式资源。



4.页面创建

App.jsx 保留类组件，其它页面或组件，改为函数式组件形式，

创建 home ，category，cart，profile 页面。

在 app.config.js 中，

配置窗口 window（仅在小程序中有效）

配置 tabbar。