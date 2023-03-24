一、页面通讯

1.事件总线

新建 detail03 页面，在其中触发（uni.$emit）

在触发事件前，一定要先监听。在 homne 中监听（uni.$on）

有事件监听，一定有取消监听，在 home 的 onUnLoad 中取消监听。

事件总线的 API 是全局的，可以跨组件通讯。

只有逆向传递的情况，因为要先监听，后触发。

API 总结：



二、生命周期

页面生命周期和组件生命周期。

在 home，categoroy，detail04 中进行测试。

tabbar 页面不会销毁，只是隐藏。

创建 detail05，测试 Composition API

vue 和 @dcloud/uni-app 不需要安装，可直接使用。



三、网络请求。

https://uniapp.dcloud.net.cn/api/request/request.html

新建一个页面，用于测试发送网络请求。

在 service 目录下，对网络请求进行封装。

对封装的请求进行测试。



四、数据缓存。

API 总结。



五、组件

easycom 组件规范。不需要引入，直接使用。

组件 Options API 不支持页面的生命周期。

在 hy-button-setup 中，测试 Composition API onReady 比较特殊。



六、Composition API 页面传参

在 home 中进行测试。

正向传递，接收有两种方式。

逆向传递：

事件总线。

