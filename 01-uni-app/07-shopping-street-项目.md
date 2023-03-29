# 一、home 页面

> 【注意】：
>
> uni-app 组件的生命周期的优先级：直接写（`onBeforeCreated` / `onCreated`） > `onLoad` > `onMounted`
>
> 开发时要注意：尽量不要进行跨域跳转。

## 1.商品列表区域

### 1.封装网络请求

01-uni-app\demo-project\02-shopping-street\service\home.js

```js
import ztRequest from './index.js'

export const getHomeGoodsData = (type, page) =>
	ztRequest.get('/home/data', {
		type,
		page
	})
```

### 2.封装 action

在 home store 的 state 中，加入 `goodList` 状态，用于存储商品列表数据。

`goodList` 数据结构为对象，key 分别为"`pop`"、“`new`"、”`sell`“，分别对应”流行“、“新款”、“精选”的数据，

01-uni-app\demo-project\02-shopping-street\store\home.js

```js
export const useHomeStore = defineStore('home', {
	state: () => ({
		//...
		goodsList: {
			pop: {
				page: 0,
				list: []
			},
			new: {
				page: 0,
				list: []
			},
			sell: {
				page: 0,
				list: []
			}
		}
	}),
	actions: {
		//...
		fetchHomeGoodsDataAction(type, page) {
			getHomeGoodsData(type, page).then(res => {
				console.log('fetchHomeGoodsDataAction res:', res)
				this.goodsList[type].list = this.goodsList[type].list.concat(
					res.data.list
				)
				this.goodsList[type].page = page
			})
		}
	}
})
```

在 `home.vue` 中，派发三次 action，分别请求三部分数据。

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<script setup>
//...

onLoad(() => {
	//...

	// 商品数据
	homeStore.fetchHomeGoodsDataAction('pop', 1)
	homeStore.fetchHomeGoodsDataAction('new', 1)
	homeStore.fetchHomeGoodsDataAction('sell', 1)
})
//...
</script>
```

### 3.uni-ui 组件安装

安装 uni-ui 框架提供的 [uni-grid](https://ext.dcloud.net.cn/plugin?name=uni-grid) 宫格插件。

在 `home.vue` 中，使用该组件，编写商品列表区域。

创建 `grid-item-view.vue` 组件，用来展示商品 itme。调整样式。

点击商品 item，跳转到详情页 `detail.vue`

01-uni-app\demo-project\02-shopping-street\components\grid-item-view\grid-item-view.vue

```vue
<template>
	<view class="goods-item" @click="onItemClick">
		<image class="image" :src="itemInfo.show.img" mode="widthFix"></image>

		<view class="desc-info">
			<view class="title">{{ itemInfo.title }}</view>
			<view class="info">
				<text class="price">￥{{ itemInfo.price }}</text>
				<image class="icon" src="@/static/images/common/favor.png"></image>
				<text class="cfav">{{ itemInfo.cfav }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	itemInfo: {
		type: Object,
		default: () => {}
	}
})

const emit = defineEmits(['itemClick'])

const onItemClick = () => {
	emit('itemClick', props.itemInfo)
}
</script>

<style lang="less">
.goods-item {
	//...
}
</style>
```

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<template>
	<view>
		<!-- ... -->

		<!-- 宫格 -->
		<uni-grid
			:column="2"
			:highlight="false"
			:showBorder="false"
			:square="false"
		>
			<template
				v-for="(item, index) of goodsList[currentType].list"
				:key="item.iid"
			>
				<uni-grid-item :index="index">
					<grid-item-view
						:itemInfo="item"
						@itemClick="handleGridItemClick"
					></grid-item-view>
				</uni-grid-item>
			</template>
		</uni-grid>
	</view>
</template>

<script setup>
// ...

const homeStore = useHomeStore()
const { goodsList, currentType } = storeToRefs(homeStore)

//...

// 商品 item 点击
const handleGridItemClick = item => {
	uni.navigateTo({
		url: '/pages/detail/detail?iid=' + item.iid
	})
}
</script>
```

创建 `detail.vue` 页面，在其中拿到商品 id，有两种方式：

- onLoad option。
- props（项目中采用）

01-uni-app\demo-project\02-shopping-street\pages\detail\detail.vue

```vue
<template>
	<view> iid: {{ iid }} </view>
</template>

<script setup>
defineProps({
	iid: {
		type: String,
		default: ''
	}
})
</script>

<style lang="less"></style>
```

### 3.数据切换

点击选项卡，切换数据显示。

在 hoem store 中，新增状态 `currentType`，用来保存当前选项卡选中信息。

01-uni-app\demo-project\02-shopping-street\store\home.js

```js
import goodsType from '@/static/data/home-goods-type.json'

export const useHomeStore = defineStore('home', {
	state: () => ({
    //...
		currentType: goodsType[0].name,
  }),
	actions: {
    //...
		changeGoodsType(type) {
			this.currentType = type
		}
	}
}
```

在 `home.vue` 中进行实现。

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```vue
<template>
	<view>
		<!-- 选项卡，easycom 组件，直接使用 -->
		<tab-control
			:titles="goodsType.map(item => item.label)"
			@tabItemClick="handleTabControlClick"
		></tab-control>

		<!-- 宫格 -->
		<uni-grid
			:column="2"
			:highlight="false"
			:showBorder="false"
			:square="false"
		>
			<template
				v-for="(item, index) of goodsList[currentType].list"
				:key="item.iid"
			>
				<uni-grid-item :index="index">
					<grid-item-view :itemInfo="item" @itemClick="..."></grid-item-view>
				</uni-grid-item>
			</template>
		</uni-grid>
	</view>
</template>

<script setup>
import goodsType from '@/static/data/home-goods-type.json'

const homeStore = useHomeStore()
const { goodsList, currentType } = storeToRefs(homeStore)

onLoad(() => {
	// 商品数据
	homeStore.fetchHomeGoodsDataAction('pop', 1)
	homeStore.fetchHomeGoodsDataAction('new', 1)
	homeStore.fetchHomeGoodsDataAction('sell', 1)
})

//...

// 选项卡点击
const handleTabControlClick = index => {
	homeStore.changeGoodsType(goodsType[index].name)
}
</script>
```

### 4.上拉加载更多

上拉加载更多，滚动到底部，加载下一页。

在 `package.json` 中，配置 `home.vue` 页面，距离底部一定距离时，就触发 `onReachBottom` 生命周期。

01-uni-app\demo-project\02-shopping-street\pages.json

```json
{
	"path": "pages/home/home",
	"style": {
		"enablePullDownRefresh": false,
		"onReachBottomDistance": 300
	}
}
```

01-uni-app\demo-project\02-shopping-street\pages\home\home.vue

```js
onReachBottom(() => {
	const type = currentType.value
	const list = goodsList.value
	homeStore.fetchHomeGoodsDataAction(type, list[type].page + 1)
})
```

## 2.优化（图片懒加载）

在 `home.vue` 页面中，实现商品列表中的图片懒加载，对 H5 端、非 H5 端，两种情况进行优化：

### 1.非 H5 端：

在 `grid-item-view.vue` 组件中，使用条件编译；

在 `<image>` 组件上添加 `lazu-load` 属性。

01-uni-app\demo-project\02-shopping-street\components\grid-item-view\grid-item-view.vue

```vue
<!-- #ifdef H5 -->
<image
	class="image"
	:lazy-load="true"
	:src="itemInfo.show.img"
	mode="widthFix"
></image>
<!-- #endif -->
```

### 2.H5 端：

需要使用 npm 安装插件 _vue3-lazy_ 插件。

1. 先初始化 `package.json` 文件；

   ```shell
   npm init -y
   ```

2. 再安装 *vue3-lazy* 插件，该插件针对 H5 进行懒加载。

   ```shell
   npm install vue3-lazy
   ```

3. 再 `main.js` 中，安装 lazy-plugin 插件，使用条件编译。

   ```js
   import App from './App'
   import * as Pinia from 'pinia'
   import lazyPlugin from 'vue3-lazy'

   // #ifdef VUE3
   import { createSSRApp } from 'vue'
   export function createApp() {
   	const app = createSSRApp(App)

   	app.use(Pinia.createPinia())
   	app.use(lazyPlugin, {
   		loading: '../static/images/common/placeholder.png'
   	})
   	return {
   		app,
   		Pinia
   	}
   }
   // #endif
   ```

4. 在 `<grid-view-item>` 组件中，使用条件编译

01-uni-app\demo-project\02-shopping-street\components\grid-item-view\grid-item-view.vue

```vue
<!-- #ifdef H5 -->
<img class="image" v-lazy="itemInfo.show.img">
<!-- #endif -->
```
