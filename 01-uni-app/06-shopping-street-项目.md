# 一、创建项目

创建一个新的项目 `02-shopping-street`

# 二、依赖安装

在项目中安装 vue3-lazy 依赖（后续图片懒加载优化时会用到）。

# 三、全局样式

在 static 目录下，存放图片。

> 【注意】：小程序中的样式，引用图片，仅支持 base64 和网络图片。

新建 styles 目录，存放全局样式 `global.scss`（项目中未使用）。

01-uni-app\demo-project\02-shopping-street\styles\global.scss

```scss
// 这些是scss变量
$gPrimaryColor: #ff5777;
$gTintColor: #ff8198;

$gPriceColor:#ff5f3e;
$gNormalColor: #666;

$gBgColor:#f2f2f2;
$gFontSize: 28rpx;

// 定义混合
@mixin normalFlex ($direction: row, $justify: space-between){
	display: flex;
	flex-direction: $direction;
	justify-content: $justify;
}

@mixin textEllipsis() {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
```

在全局引入（项目中未使用）

01-uni-app\demo-project\02-shopping-street\App.vue

```vue
<style>
	/*每个页面公共css */
	@import url("@/styles/global.less");
</style>
```

# 四、项目目录结构

新建 `home.vue`、`category.vue`、`cart.vue`、`profile.vue` 页面。

配置每个页面头部的标题名称和背景颜色。

配置 tabbar。

01-uni-app\demo-project\02-shopping-street\pages.json

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/home/home",
			"style": {
				"enablePullDownRefresh": false
			}

		}, {
			"path": "pages/category/category",
			"style": {
				"enablePullDownRefresh": false
			}

		}, {
			"path": "pages/cart/cart",
			"style": {
				"enablePullDownRefresh": false
			}

		}, {
			"path": "pages/profile/profile",
			"style": {
				"enablePullDownRefresh": false
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "white",
		"navigationBarTitleText": "购物街", // 统一配置 App 标题名称
		"navigationBarBackgroundColor": "#ff8190",
		"backgroundColor": "#F8F8F8"
	},
	"uniIdRouter": {},
	"tabBar": {
		"selectedColor": "#ff8190",
		"list": [{
				"text": "首页",
				"pagePath": "pages/home/home",
				"iconPath": "static/images/tabbar/home.png",
				"selectedIconPath": "static/images/tabbar/home_active.png"
			},
			{
				"text": "分类",
				"pagePath": "pages/category/category",
				"iconPath": "static/images/tabbar/category.png",
				"selectedIconPath": "static/images/tabbar/category_active.png"
			},
			{
				"text": "购物车",
				"pagePath": "pages/cart/cart",
				"iconPath": "static/images/tabbar/cart.png",
				"selectedIconPath": "static/images/tabbar/cart_active.png"
			},
			{
				"text": "首页",
				"pagePath": "pages/profile/profile",
				"iconPath": "static/images/tabbar/profile.png",
				"selectedIconPath": "static/images/tabbar/profile_active.png"
			}
		]
	}
}
```

# 五、网络请求

封装网络请求。

01-uni-app\demo-project\02-shopping-street\service\index.js

```js
const TIME_OUT = 60000
const BASE_URL = 'http://123.207.32.32:7888/api/hy66'

class ZtRequest {
	constructor(timeout, baseUrl) {
		this.timeout = timeout
		this.baseUrl = baseUrl
	}

	request(url, method = 'GET', data = {}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.timeout + url,
				method,
				timeout: this.baseUrl,
				data,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}

	get(url, params) {
		return this.request(url, 'GET', params)
	}

	post(url, data) {
		return this.request(url, 'POST', data)
	}
}

export default new ZtRequest(TIME_OUT, BASE_URL)
```

封装首页轮播图的网络请求。

01-uni-app\demo-project\02-shopping-street\service\home.js

```js
import ztRequest from './index.js

export const getHomeMutidata = () => ztRequest.get('/home/multidata')
```

在 `home.vue` 中发送轮播图的网络请求，进行测试（项目中未测试）。

# 六、状态管理

在项目中集成 Pinia。

01-uni-app\demo-project\02-shopping-street\main.js

```js
import App from './App'
import * as Pinia from 'pinia'

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	
	app.use(Pinia.createPinia())
  return {
    app,
		Pinia
  }
}
// #endif
```

创建 store 的 home 模块。

在其中创建 action，发送网络请求，将“轮播图”和“推荐”数据保存到 store 中。

01-uni-app\demo-project\02-shopping-street\store\home.js

```js
import {
	defineStore
} from 'pinia'
import {
	getHomeMutidata
} from '@/service/home.js'

export const useHomeStore = defineStore('home', {
	state: () => ({
		banners: [],
		recommends: []
	}),
	actions: {
		async fetchHomeMultiDataAction() {
			getHomeMutidata().then(res => {
				console.log('getHomeMutidata res:', res);
				this.banners = res.data.banner.list || []
				this.recommends = res.data.recommend.list || []
			})
		}
	}
})
```

# 七、home 页面

## 1.HomeBanner 组件

在 `home.vue` 中，派发 action 获取轮播图和推荐数据。

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<template>
	<view>
		home
	</view>
</template>

<script setup>
	import { useHomeStore } from '@/store/home.js'
	import { storeToRefs } from 'pinia'
	import { onLoad } from '@@dcloudio/uni-app'
	
	const homeStore = useHomeStore()
	const { banners } = storeToRefs(homeStore)
	
	onLoad(() => {
		homeStore.fetchHomeMultiDataAction()
	})
</script>
```

封装轮播图组件 `home-banner.vue`

01-uni-app\demo-project\02-shopping-street\pages\home\cpns\home-banner.vue

```vue
<template>
	<swiper class="banner" :indicator-dots="true" indicator-active-color="#ff8190" :autoplay="true" :interval="3000"
		:duration="1000">
		<template v-for="item of banners" :key="item.title">
			<swiper-item @click="onBannerItemClick(item)">
				<image class="image" :src="item.image" mode="widthFix"></image>
			</swiper-item>
		</template>
	</swiper>
</template>

<script setup>
	defineProps({
		banners: {
			type: Array,
			dafault: () => []
		}
	})
	
	const emit = defineEmits(['bannerItemClick'])
	
	const onBannerItemClick = banenrItem => {
		emit('bannerItemClick', banenrItem.link)
	}
</script>

<style lang="less">
	.banner {
		.image {
			width: 100%;
		}
	}
</style>
```

在 `home.vue` 中展示。

点击轮播图。实现跳转。

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<template>
	<view>
		<!-- 轮播图组件 -->
		<HomeBanner :banners="banners" @bannerItemClick="handleBannerItemClick"></HomeBanner>
	</view>
</template>

<script setup>
	import { useHomeStore } from '@/store/home.js'
	import { storeToRefs } from 'pinia'
	import { onLoad } from '@dcloudio/uni-app'
	
	import HomeBanner from './cpns/home-banner.vue'
	
	const homeStore = useHomeStore()
	const { banners } = storeToRefs(homeStore)
	
	onLoad(() => {
		homeStore.fetchHomeMultiDataAction()
	})
	
	// 轮播图点击
	const handleBannerItemClick = link => {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + link
		})
	}
</script>
```

创建一个 `webview.vue` 页面，跳转后来到该页面。接收链接，展示对应的 webview 页面。

01-uni-app\demo-project\02-shopping-street\pages\webview\webview.vue

```vue
<template>
	<web-view :src="link"></web-view>
</template>

<script setup>
	defineProps({
		link: {
			type: String,
			default: ''
		}
	})
</script>
```

## 2.HomeRecommend 区域

封装推荐组件 `HomeRecommend.vue`；

01-uni-app\demo-project\02-shopping-street\pages\home\cpns\home-recommend.vue

```vue
<template>
	<view class="recommend">
		<template v-for="item in recommends" :key="item.title">
			<view class="recommend-item" @click="onRecommendItemClick(item)">
				<image class="image" :src="item.image" mode="widthFix"></image>
				<view class="title">{{ item.title }}</view>
			</view>
		</template>
	</view>
</template>

<script setup>
	defineProps({
		recommends: {
			type: Array,
			default: () => []
		}
	})
	
	const emit = defineEmits(['recommendItemClick'])
	
	const onRecommendItemClick = item => {
		emit('recommendItemClick', item)
	}
	
</script>

<style lang="less">
	.recommend {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		
		.recommend-item {
			// less 混入
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			font-size: var(--gFontSize);
			
			.image {
				width: 150rpx;
				height: 150rpx;
			}
			
			.title {
				margin-top: 10rpx;
			}
		}
	}
</style>
```

在 `home.vue` 中展示。

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<template>
	<view>
    
		<!-- 推荐 -->
		<HomeRecommend :recommends="recommends" @recommendItemClick="handleRecommendItemClick"></HomeRecommend>
    
	</view>
</template>

<script setup>
	import { useHomeStore } from '@/store/home.js'
	import { storeToRefs } from 'pinia'
	import { onLoad } from '@dcloudio/uni-app'
  
	import HomeRecommend from './cpns/home-recommend.vue'
	
	const homeStore = useHomeStore()
	const { recommends } = storeToRefs(homeStore)
	
	onLoad(() => {
		homeStore.fetchHomeMultiDataAction()
	})
	
	const handleRecommendItemClick = item => {
		console.log('recommend item:', item);
	}
</script>
```

## 3.HomePopular 区域

封装热门组件 `home-popular.vue`；

使用 `<image>` 组件展示图片后，小程序服务，可能需要重启才能正常展示。

> [注意】：小程序在 css 中引用背景图片，才需要将图片放到 static 根目录，
>
> 这样才能自动编译成 base64 格式。
> 

01-uni-app\demo-project\02-shopping-street\pages\home\cpns\home-popular.vue

```vue
<template>
	<view class="popular">
		<image class="image" src="@/static/recommend_bg.jpg"></image>
	</view>
</template>

<script setup>
</script>

<style lang="less">
	.popular {
		.image {
			width: 100%;
		}
	}
</style>

```

在 `home.vue` 中展示。

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<template>
	<view>
		<!-- 热门 -->
		<HomePopular></HomePopular>
	</view>
</template>
```

## 4.TabControl 组件

在 components 目录下：

封装选项卡 `tab-control.vue` 组件，使用 **easycom 组件规范**。

点击切换选项卡。

01-uni-app\demo-project\02-shopping-street\components\tab-control\tab-control.vue

```vue
<template>
	<view class="tab-control">
		<template v-for="(title, index) of titles" :key="title">
			<view :class="['item', { active: currentIndex === index }]" @click="onTabItemClick(index)">
				<text class="title">{{title}}</text>
			</view>
		</template>
	</view>
</template>

<script setup>
	import { ref } from 'vue'

	const currentIndex = ref(0)

	defineProps({
		titles: {
			type: Array,
			default: () => []
		}
	})

	const emit = defineEmits(['tabItemClick'])

	const onTabItemClick = index => {
		currentIndex.value = index
		emit('tabItemClick', index)
	}
</script>

<style lang="less">
.tab-control {
	
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
		margin-top: 10rpx;
		text-align: center;
		
		.item {
			flex: 1;
			
			.title {
				display: inline-block; // 让外侧轮廓变小
				padding: 16rpx;
				border-bottom: 6px solid #fff;
			}
			
			&.active {
				.title {
					color: var(--gTintColor);
					border-bottom-color: var(--gTintColor);
				}
			}
		}
}
</style>
```

在 `home.vue` 中使用。

获取当前点击的选项卡索引。

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<template>
	<view>
    
		<!-- 选项卡，easycom 组件，直接使用 -->
		<tab-control :titles="['流行', '新款', '精选']" @tabItemClick="handleTabControlClick"></tab-control>
		
	</view>
</template>

<script setup>
  //...
	
	// 选项卡点击
	const handleTabControlClick = index => {
		console.log('tab control currentIndex:', index);
	}
</script>
```