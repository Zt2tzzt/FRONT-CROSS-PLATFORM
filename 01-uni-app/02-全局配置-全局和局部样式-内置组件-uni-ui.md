# 一、App.vue 文件

## 1.globalData 全局变量

在 `App.vue` 中。定义全局变量 `globalData`

01-uni-app\demo-project\01-hello-uniapp\App.vue

```vue
<script>
	export default {
		onLaunch: function(options) {
			console.log('小程序应用启动参数 option：', options);
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			name: 'zzt',
			age: 18
		}
	}
</script>
```

在页面中拿到 `globalData`

在 `index.vue` 页面的生命周期 `onLoad` 中，使用 `getApp()` 拿到 `app` 实例;

再通过它拿到 `globalData`。

01-uni-app\demo-project\01-hello-uniapp\pages\index\index.vue

```vue
<script>
	export default {

		onLoad() {
			console.log('Vue 的实例 this:', this);

			const app = getApp()
			console.log('globalData:', app.globalData);
		},
	}
</script>
```

## 2.页面路由（页面栈）

使用 `getCurrentPages` 拿到当前页面的路由。

用于获取当前页面栈的实例，以数组形式，按栈的顺序排列；

- 第一个元素为首页，最后一个元素为当前页面。

仅用于展示页面栈的情况，不要修改页面栈，以免造成页面状态错误。

01-uni-app\demo-project\01-hello-uniapp\pages\index\index.vue

```vue
<script>
	export default {

		onLoad() {
			const pages = getCurrentPages()
			console.log('page route:', pages[pages.length - 1].route); // pages/index/index
		},
	}
</script>
```

> 【注意】：`getApp` 和 `getCurrentPages` 都是跨端 api。兼容 h5、weapp、app.

> 【注意】：在 `App.vue` 中要使用 *Option API*，在页面/组件中可使用 *Composition API*。

> 【注意】：`<style>` 标签不支持写 `scope`，默认已有作用域。

在 `App.vue` 中，一般定义全局样式，使用 `page` 选择器：

01-uni-app\demo-project\01-hello-uniapp\App.vue

```vue
<style lang="less">

  page {
    height: 100%;
    box-sizing: border-box;
    border: 3px red solid;
  }

</style>
```

> 【注意】：`page` 会选到 H5 端渲染的 `<uni-page-body>` 自定义元素。
>
> 在原生调试页面，看不到元素，需要将文件改为 `.nvue` 格式的文件。

# 二、uni.scss 文件

`uni.scss` 是全局样式文件。是为了方便整体控制应用风格。

其中默认定义了 uni-app 框架内置全局变量，也可以存放自定义的全局变量。

`uni.scss` 主要有如下作用：

- 存放全局样式变量。
- 重写 uni-app 内置的样式变量。
- 重写 uni-ui 内置框架的样式变量。

`uni.scss` 中定义的变量，无需 `@import` 就可以在任意组件中直接使用。

然后在该组件的 `<style>` 上加 `lang=“scss”`。

> 【注意】：修改 `uni.scss` 后，重启才能生效。

> 【注意】：这里的 *uni-app* 框架内置变量，和 *uni-ui* 组件库的内置变量是不一样的。

> 【注意】：`App.vue` 中放的是公共样式，对全局生效。
>
> `uni.scss` 中放的是全局样式变量。

02-config-uni-app\static\css\base.scss

```scss
$borderColor: blue;
$radius: 30rpx;
```

01-uni-app\demo-project\01-hello-uniapp\uni.scss

```scss
// 1.定义自定义的全局的样式变量
@import '@/static/css/base.scss';
$zt-color: orange;

// 2.重写 uni-app 内置的样式变量
$uni-color-primary: #007aff;
```

# 三、全局和局部样式

App.vue 全局样式：

`App.vue` 中 `<style>` 中的样式为全局样式，作用于每一个页面（`style` 标签不支持 `scoped`，写了样式无效）。

`App.vue` 中，通过 `@import` 语句可以引入外联样式，同样可作用于每一个页面。

uni.scss 全局样式：

`uni.scss` 文件也是用来编写全局样式的，通常用来定义全局变量。

`uni.scss` 中，通过 `@import` 语句可以导入外联样式，同样作用于每一个页面。

局部样式：

在 pages 目录下 vue 文件的 `<style>` 中的样式为局部样式；

作用对应的页面，会覆盖 `App.vue` 中相同的选择器；

支持 scss、less 等预处理器。

不支持 `scoped`，不要写，否则样式不生效。

# 四、page.json 文件

类似于小程序中的 `app.json` 文件。

[page.json](https://uniapp.dcloud.net.cn/collocation/pages.html) 是全局页面配置文件（兼容 h5、weapp、app ）；

决定页面的路径、窗口样式、原生的导航栏、原生的 tabbar 等等。

01-uni-app\demo-project\01-hello-uniapp\pages.json

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				// 优先级比 globalStyle 高。
				"navigationBarTextStyle": "white",
				"navigationBarTitleText": "uni-app",
				"navigationBarBackgroundColor": "#ffc0cb"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	},
	"uniIdRouter": {}
}
```

# 五、manifest.json 文件

[manifest.json](https://uniapp.dcloud.net.cn/collocation/manifest.html#) 应用配置，在 HBuilderX 中，支持可视化的配置，用于：

- Android 平台相关配置

- iOS 平台相关配置

- Web 端相关的配置

- 微信小程序相关配置

配置小程序的 `appid`

01-uni-app\demo-project\01-hello-uniapp\manifest.json

# 六、常用内置组件

接近小程序的规范，有如下组件：

## 1.view 组件

[\<view\>](https://uniapp.dcloud.net.cn/component/view.html#)：视图容器。

类似于 html 中的 `<div>`，用于包裹各种元素内容。

也可以使用 `<div>`，但不跨平台，所以不推荐。

01-uni-app\demo-project\01-hello-uniapp\pages\index\index.vue

```vue
<template>
	<view class="content">
		<!-- div 也不是不能用，但是不推荐，它不跨平台，且编译效率低 -->
		<div>我是一个 div</div>
		<view class="title">1.全局样式测试</view>
		<view class="name">2.全局样式测试</view>
	</view>
</template>
```

## 2.text 组件

[\<text\>](https://uniapp.dcloud.net.cn/component/text.html)：文本组件。

用于包裹文本内容。

01-uni-app\demo-project\01-hello-uniapp\pages\index\index.vue

```vue
<template>
	<view class="content">
		<text>我是一个 text 组件</text>
		<text>哈哈</text>
	</view>
</template>
```

## 3.button 组件

[\<button\>](https://uniapp.dcloud.net.cn/component/button.html#)：按钮组件；

在小程序端的主题颜色，和在其它端的主题颜色不一样（可通过条件编译来统一风格）。

01-uni-app\demo-project\01-hello-uniapp\pages\index\index.vue

```vue
<template>
	<view class="content">
		<button type="primary">我是一个 button</button>
	</view>
</template>
```

## 4.image 组件

[\<image\>](https://uniapp.dcloud.net.cn/component/image.html)：图片。默认宽度 `320px`、高度 `240px`；

支持相对路径、绝对路径，base64 码；

01-uni-app\demo-project\01-hello-uniapp\pages\index\index.vue

```vue
<template>
	<view class="content">
		<!-- 图片，相对路径 -->
		<image class="pic" src="../../static/images/cvy.png" mode="widthFix"></image>
		<!-- 图片：绝对路径 -->
		<image class="pic" src="@/static/images/cvy.png" mode="widthFix"></image>
		<!-- 图片：导入图片，不支持 -->、
		<image class="pic" :src="cvy" mode="widthFix"></image>
	</view>
</template>

<script>
  import cvy from '@/static/images/cvy.png'
</script>
```

## 5.scroll-viwe 组件

[\<scroll-view\>](https://uniapp.dcloud.net.cn/component/scroll-view.html)：可滚动视图区域。

- 竖向滚动时，须给 `<scroll-view>` 一个固定高度；
- 横向滚动时，须给 `<scroll-view>` 添加 `white-space: nowrap;` 样式；且子元素设置为**行内块级元素**。

> 【注意】：
>
> APP、小程序中，不要在 `<scroll-view>` 中使用 `<map>`、`<video>` 等原生组件。
>
> 小程序中，不要在 `<scroll-view>` 中使用 `<canvas>`、`<textarea>` 等原生组件。
>
> 若要使用下拉刷新，建议使用页面的滚动，而不是 `<scroll-view>`。

01-uni-app\demo-project\01-hello-uniapp\pages\index\index.vue

```vue
<template>
	<view class="content">

		<!-- 纵向滚动 -->
		<scroll-view scroll-y="true" class="zt-y-scroll">
			<view class="y-item">item1</view>
			<view class="y-item">item2</view>
			<view class="y-item">item3</view>
			<view class="y-item">item4</view>
			<view class="y-item">item5</view>
			<view class="y-item">item6</view>
			<view class="y-item">item7</view>
		</scroll-view>

		<!-- 横向滚动 -->
    <scroll-view scroll-x="true" class="zt-x-scroll" :show-scrollbar="false">
			<view class="x-item">item1</view>
			<view class="x-item">item2</view>
			<view class="x-item">item3</view>
			<view class="x-item">item4</view>
			<view class="x-item">item5</view>
			<view class="x-item">item6</view>
			<view class="x-item">item7</view>
		</scroll-view>

	</view>
</template>

<style lang="less">
	.zt-y-scroll {
		height: 400rpx; // 须有固定高度
		border: 2rpx red solid;
		box-sizing: border-box;

		.y-item {
			height: 200rpx;
			border-bottom: 2rpx solid blue;
		}
	}

	.zt-x-scroll {
		white-space: nowrap; // 须有该设置

		/* 隐藏原生实现的滚动条。*/
		/* &::-webkit-scrollbar {
			display: none;
		} */

		:deep(.zt-x-scroll .uni-scroll-view::-webkit-scrollbar) {
			display: none;
		}
		/* :global { } 在全局查找选择器 */

		.x-item {
			display: inline-block;
			height: 200rpx;
			width: 200rpx;
			border-right: 2rpx solid #ffc0cb;
		}
	}
</style>
```

> 【注意】：选中全局选择器，需要用 `:global`；选中深层选择器，需要用 `:deep`

## 6.swiper 组件

[\<swiper\>](https://uniapp.dcloud.net.cn/component/swiper.html)：滑块视图容器，一般用于左右或上下区域滚动，比如轮播图。

默认宽 `100%`，高为 `150px`；

设置 `<swiper>` 组件高度，图片宽高可用 `100%`。

```vue
<template>
	<view class="content">
		<swiper
      class="zt-swiper"
      :indicator-dots="true"
      indicator-active-color="#ffc0cb"
      indicator-color="#f8f8f8"
			:autoplay="true"
      :interval="3000"
      :duration="1000">
			<swiper-item>
				<image class="swiper-image" src="@/static/images/banners/banner01.jpeg"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-image" src="@/static/images/banners/banner02.jpeg"></image>
			</swiper-item>
		</swiper>

	</view>
</template>

<style lang="less">
	.zt-swiper {
		height: 400rpx;

		.swiper-image {
			width: 100%;
			height: 100%;
		}
	}
</style>
```

# 七、尺寸单位（rpx）

uni-app 支持的通用 css 单位包括：px、rpx（推荐）、vh、vw。

- px 即屏幕像素。rpx 是响应式像素（responsive pixel），可以根据屏幕宽度进行自适应。

规定屏幕宽为 `750rpx`；如在 iPhone6 上：

- 屏幕宽度为 `375px`，共有 `750` 个物理像素，则：
- `750rpx = 375px = 750物理像素`；
- `1rpx = 0.5px = 1物理像素`。

建议：开发微信小程序时，设计师用 iPhone6 作为设计稿的标准（即：设计稿宽度为 `750px`）。

# 八、样式导入

使用 `@import` 语句可以导入外联样式（css 或 scss），用 `;` 表示语句结束。

支持相对路径，如 `import ‘../../common/base.css’;`

支持绝对路径，即 `@` 别名前缀。如 `import '@/static/common/base.css';`

# 九、背景图片

在 `page.json` 文件中，对项目新建一个页面，

在该页面中测试背景图片。

01-uni-app\demo-project\01-hello-uniapp\pages.json

```json
{
	"pages": [ //pages 数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/style/style",
			"style": {
				"navigationBarTitleText": "",
				"enablePullDownRefresh": false
			}
		},
		{
			"path": "pages/index/index",
			"style": {
				// 优先级比 globalStyle 高。
				"navigationBarTextStyle": "white",
				"navigationBarTitleText": "uni-app",
				"navigationBarBackgroundColor": "#ffc0cb"
			}
		}
	],
}
```

01-uni-app\demo-project\01-hello-uniapp\pages\style\style.vue

```vue
<template>
	<view class="style-page">
		<view class="bg-view"></view>
	</view>
</template>


<style lang="less">
	.bg-view {
		height: 200rpx;
		border: 1px #f00 solid;

		background-image: url('../../static/images/cvy.png');
		background-repeat: no-repeat;
		background-size: contain;
	}
</style>
```

uni-app 支持在 css 里设置背景图片，使用方式与普通 web 项目大体相同；

默认支持 base64 图片、网络路径图片。

在 css 中，使用本地背景图片、字体图标时：

- 小程序要注意：
  - 不支持本地的图片，也不能自动转 base64 格式，除非将图片直接放在 static 目录下.
- 本地背景图片的引用路径推荐使用以 `~@` 开头的绝对路径。

# 十、字体图标

uni-app 支持使用字体图标，使用方式与普通 web 项目相同，

使用步骤如下：

1. 先制作字体图标，比如：在 iconfont 网站中生成；
2. 将字体图标文件引入项目，比如：`iconfont.ttf`；
3. 在全局的 css 中引入字体图标，比如：`App.vue`。

01-uni-app\demo-project\01-hello-uniapp\App.vue

```vue
<style lang="less">
	@import url('@/static/custom-font/iconfont.css');
</style>
```

4.使用字体图标。

01-uni-app\demo-project\01-hello-uniapp\pages\style\style.vue

```vue
<template>
	<view class="style-page">
		<text class="text iconfont icon-shouye"></text>
		<text class="text iconfont icon-video"></text>
	</view>
</template>

<style lang="less">

	.text {
		font-size: 50rpx;
		color: #f00;
	}
</style>
```

# 十一、扩展组件 uni-ui

## 1.是什么？

uni-ui 是 DCloud 提供的一个 UI 组件库；

一套基于 Vue 组件、flex 布局的跨全端 UI 框架。

不包括 uni-app 框架提供的基础组件，而是基础组件的补充。[详情](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)

## 2.特点

高性能：

- 目前为止，在小程序和混合 app 领域，uni-ui 是性能的标杆。
- 自动**差量更新**数据。uni-app 引擎底层会自动用 diff 算法更新数据。
- 优化逻辑层和视图层通讯折损。
  - 比如，需要跟手式操作的 UI 组件，底层使用了 wxs、bindingx 等技术，实现了高性能的交互体验。
  - bindingx 技术提供了一种称之为表达式绑定（Expression Binding) 的机制，
  - 在 Weex 上让手势等复杂交互操作以 60fps 的帧率流畅执行，而不会导致卡顿。
  - WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
  - 在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。

全端：

- uni-ui 的组件都是多端自适应的，底层会抹平很多小程序平台的差异或 bug；
- uni-ui 还支持 nvue 原生渲染、以及 PC 宽屏设备。

风格扩展：

- uni-ui 的默认风格与 uni-app 基础组件风格一致。
- 支持 `uni.scss`，可以方便的扩展和切换应用的风格。

## 3.安装

方式一（推荐）：通过 `uni_modules`（插件模块化规范）**按需安装**组件。

1. 官网找到[扩展组件](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#%E9%80%9A%E8%BF%87-uni-modules-%E5%8D%95%E7%8B%AC%E5%AE%89%E8%A3%85%E7%BB%84%E4%BB%B6)清单，将所需组件导入到项目 `uni_modules` 目录中，
2. 导入后直接使用，无需 `import` 和注册。
3. 如果要自定义组件风格，在 `uni.scss` 导入 *uni-ui* 提供的内置 scss 变量而文件，并覆盖，然后重启应用。

> 需要登录 DCloud 账号才能安装。

方式二（推荐）：通过 `uni_modules` **安装全部**组件；[官方文档](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#%E9%80%9A%E8%BF%87-uni-modules-%E5%AF%BC%E5%85%A5%E5%85%A8%E9%83%A8%E7%BB%84%E4%BB%B6)

- 一次性把所有 uni-ui 组件导入到项目，可以借用 HbuilderX 插件直接导入。
- 如果没有自动导入其他组件，可在 `uni_modules` 组件目录上右键选择安装三方插件依赖即可。

方式三：在 HBuilderX 新建 uni-app 项目时，在模板中选择 uni-ui 模板来创建项目 

- 由于 uni-app 独特的 easycom（自动导包）技术，可以免引入、注册，
- 创建项目时，选择提供的项目模板，就直接使用符合规则的 vue 组件。

方式四：npm 安装 

- 在 vue-cli 项目中可用 npm 安装 uni-ui 库
- 或直接在 HBuilderX 项目中用 npm 安装 。

## 4.使用

安装 `<uni-badge>` 徽章组件；`<uni-countdown>` 倒计时组件；`<uni-goods-nav>` 商品导航组件。

1.使用 [uni-badge](https://ext.dcloud.net.cn/plugin?name=uni-badge) 组件，用于展示徽标。

01-uni-app\demo-project\01-hello-uniapp\pages\uni-ui\UniUi.vue


```vue
<template>
	<view class="content">
		<uni-badge text="100" type="primary"></uni-badge>
		<uni-badge text="80" type="success"></uni-badge>
		<uni-badge text="90" type="info" absolute="rightTop">
			<button>button</button>
		</uni-badge>
	</view>
</template>
```

2.使用 [uni-countdown](https://ext.dcloud.net.cn/plugin?name=uni-countdown) 组件，用于展示倒计时。

01-uni-app\demo-project\01-hello-uniapp\pages\uni-ui\UniUi.vue

```vue
<template>
	<view class="content">
		<uni-countdown
      color="white"
      background-color="#cdcdcd"
      :day="0"
      :show-day="false"
      :hour="6"
      :minute="12"
			:second="20">
    </uni-countdown>
	</view>
</template>
```

3.使用 [uni-goods-nav](https://uniapp.dcloud.net.cn/component/uniui/uni-goods-nav.html) 组件，用于展示商品底部导航栏。

01-uni-app\demo-project\01-hello-uniapp\pages\uni-ui\UniUi.vue

```vue
<template>
	<view class="content">
		<uni-goods-nav
      :fill="true"
      :options="options"
      :buttonGroup="buttonGroup"
      @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			onClick(e) {
				console.log('onClick e:', e);
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log('buttonClick e:', e);
				this.options[2].info++
			}
		}
	}
</script>
```

