执行顺序：直接写 > onLoad > onMounted

开发时要注意：尽量不要进行跨域跳转。



商品列表区域编写。

封装网络请求。

封装 action

在 store 的 state 中，加入 goodList 状态，用于存储商品列表数据。

- 数据结构为对象，分为“流行”，“新款”和“精选”，
- 不能写死，最好动态来生成。

派发三次 action，分别请求三种数据。



安装 uni-grid 宫格插件。

在 home 中，使用该组件，对商品列表。

创建 grid-view-item 组件，用来展示商品 itme。

调整样式。



点击选项卡，切换数据显示。

在 store 中，新增状态 currentType，用来保存当前选项卡选中信息。

在 home 中进行实现。



上拉加载更多，滚动到底部，加载下一页。

距离底部一定距离时，就发送请求。



图片懒加载实现：

image 组件上添加 lazu-load 属性。仅针对小程序进行了优化。

对 APP 和 H5 端进行优化，需要使用 npm 安装插件。

1. 先创建 package.json 文件；

   ```shell
   npm init -y
   ```

2. 再安装 vue-lazy 插件，该插件针对 H5 进行懒加载。

   ```shell
   npm install vue-lazy
   ```

3. 再 main.js 中，安装 lazy-plugin 插件，使用条件编译。

4. 再 grid-view-item 组件中，使用条件编译





点击商品 item，将商品 item 信息传给 hoem。

根据 id，跳转到商品详情页。



再 detail 页面中，拿到商品 id，有两种方式：

- onLoad option。
- props