# 一、页面通讯

## 1.事件总线

API 总结：

- `uni.$emit(eventName, OBJECT)` - 发射全局自定义事件。

- `uni.$on(eventName, callback)` - 监听由 `uni.$emit` 发射的全局自定义事件。

- `uni.$once(eventName, callback)` - 只监听一次由 `uni.$emit` 发射的全局自定义事件。

- `uni.$off(eventName, callback)` - 移除全局自定义事件监听器。如果没有提供参数，则移除所有的事件监听器；

新建 `Detail03.vue` 页面，在其中发射事件（`uni.$emit`）

01-uni-app\demo-project\01-hello-uniapp\pages\Detail03\Detail03.vue

```vue
<template>
	<view>
		<navigator :delta="1" open-type="navigateBack">
			<button>返回（组件）</button>
		</navigator>
		<button @click="goBackHome">返回（API）</button>
	</view>
</template>

<script>
export default {
	onLoad(options) {
		console.log('detail03 options:', options)
	},
	methods: {
		goBackHome() {
			uni.navigateBack({
				delta: 1
			})

			// 触发一个全局事件（触发前，一定要有监听，否则无效）
			uni.$emit('detail03ToHome', {
				data: 'detail03 传个 home 的数据，by eventBus'
			})
		}
	}
}
</script>
```

在触发事件前，一定要先监听。在 `home.vue` 中监听（`uni.$on`）。

有事件监听，一定有取消监听，在 `home.vue` 的 `onUnload` 中取消监听（`uni.$off`）。

01-uni-app\demo-project\01-hello-uniapp\pages\home\home.vue

```vue
<script>
export default {
	onLoad() {
		uni.$on('detail03ToHome', this.detail03ToHome)
	},
	onUnload() {
		uni.$off('detail03ToHome', this.detail03ToHome)
	},
	methods: {
		detail03ToHome(value) {
			console.log('home on detail03ToHome value:', value)
		}
	}
}
</script>
```

> 【注意】：
>
> 事件总线的 API 是全局的，可以跨组件通讯。
>
> 先监听，再触发事件,否则无法监听。
>
> 通常 on 和 off 是同时使用，避免重复监听，更加规范。
>
> 适合页面返回传递参数（即”逆向“传递）、不适合界面跳转传递参数（即”正向“传递），因为要先监听事件，后发射事件。

# 二、生命周期

uni-app 中的生命周期，分为**页面生命周期**和**组件生命周期**。

## 1.页面

uni-app 常用的页面生命周期函数：[更多](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)

- `onLoad(options)`

- `onShow`

- `onReady`

- `onHide`

- `onUnload`

- `onPullDownRefresh`

- `onReachBottom`

### 1.Options API

在 `home.vue`，`detail04.vue`中进行测试。

01-uni-app\demo-project\01-hello-uniapp\pages\home\home.vue

```vue
<template>
	<view>
		<view>4.页面的生命周期</view>
		<button @click="goToDetail04">01-detail04 Option API</button>
	</view>
</template>

<script>
export default {
	onLoad() {
		console.log('home onLoad')
		uni.$on('detail03ToHome', this.detail03ToHome)
	},
	onUnload() {
		console.log('home onUnload')
		uni.$off('detail03ToHome', this.detail03ToHome)
	},
	onShow() {
		console.log('home onShow')
	},
	onReady() {
		console.log('home onReady')
	},
	onHide() {
		console.log('home onHide')
	},
	onUnload() {
		console.log('home onUnload')
		uni.$off('acceptDataFromDetail03', this.acceptDataFromDetail03)
	},
	onPullDownRefresh() {
		console.log('home onPullDownRefresh')
	},
	onReachBottom() {
		console.log('home onReachBottom')
	},
	methods: {
		goToDetail04() {
			uni.navigateTo({
				url: '/pages/detail04/detail04'
			})
		}
	}
}
</script>
```

01-uni-app\demo-project\01-hello-uniapp\pages\detail04\detail04.vue

```vue
<template>
	<view>
		<view class="item">item1</view>
		<view class="item">item2</view>
		<view class="item">item3</view>
		<view class="item">item4</view>
		<view class="item">item5</view>
		<view class="item">item6</view>
		<view class="item">item7</view>
		<view class="item">item8</view>
		<view class="item">item9</view>
		<view class="item">item10</view>
		<view class="item">item11</view>
		<view class="item">item12</view>
		<view class="item">item13</view>
		<view class="item">item14</view>
		<view class="item">item15</view>
		<view class="item">item16</view>
		<view class="item">item17</view>
		<view class="item">item18</view>
		<view class="item">item19</view>
		<view class="item">item20</view>
	</view>
</template>

<script>
export default {
	// 页面的生命周期。
	onLoad() {
		console.log('detail03 onLoad')
	},
	onShow() {
		console.log('detail04 onShow')
	},
	onReady() {
		console.log('detail04 onReady')
	},
	onHide() {
		console.log('detail04 onHide')
	},
	onUnload() {
		console.log('detail04 onUnload')
	},
	onPullDownRefresh() {
		console.log('detail04 onPullDownRefresh')
	},
	onReachBottom() {
		console.log('detail04 onReachBottom')
	}
}
</script>

<style lang="less">
.item {
	height: 200rpx;
	border-bottom: 2rpx solid red;
}
</style>
```

> 【注意】：
>
> tabbar 页面不会销毁，只是隐藏。
>
> 通过 overflow 进行的滚动，不会触发 `onReachBottom` 回调

### 2.Composition API

在 `home.vue`，`detail05.vue`，中进行测试。

01-uni-app\demo-project\01-hello-uniapp\pages\home\home.vue

```vue
<template>
	<view>
		<view>4.页面的生命周期</view>
		<button @click="goToDetail05">01-detail05 Composition API</button>
	</view>
</template>

<script>
export default {
	//...
	methods: {
		//...
		goToDetail05() {
			uni.navigateTo({
				url: '/pages/detail05/detail05'
			})
		}
	}
}
</script>
```

01-uni-app\demo-project\01-hello-uniapp\pages\detail05\detail05.vue

```vue
<template>
	<view>
		<view class="item">item1</view>
		<view class="item">item2</view>
		<view class="item">item3</view>
		<view class="item">item4</view>
		<view class="item">item5</view>
		<view class="item">item6</view>
		<view class="item">item7</view>
		<view class="item">item8</view>
		<view class="item">item9</view>
		<view class="item">item10</view>
		<view class="item">item11</view>
		<view class="item">item12</view>
		<view class="item">item13</view>
		<view class="item">item14</view>
		<view class="item">item15</view>
		<view class="item">item16</view>
		<view class="item">item17</view>
		<view class="item">item18</view>
		<view class="item">item19</view>
		<view class="item">item20</view>
	</view>
</template>

<script setup>
import {
	onLoad,
	onShow,
	onReady,
	onHide,
	onUnload,
	onPullDownRefresh,
	onReachBottom
} from '@dcloudio/uni-app'

onLoad(() => {
	console.log('detail05 onLoad')
})
onShow(() => {
	console.log('detail05 onShow')
})
onReady(() => {
	console.log('detail05 onReady')
})
onHide(() => {
	console.log('detail05 onHide')
})
onUnload(() => {
	console.log('detail05 onUnload')
})
onPullDownRefresh(() => {
	console.log('detail05 onPullDownRefresh')
})
onReachBottom(() => {
	console.log('detail05 onReachBottom')
})
</script>

<style lang="less">
.item {
	height: 200rpx;
	border-bottom: 2rpx solid red;
}
</style>
```

> 【注意】：`vue` 和 `@dcloudio/uni-app` 依赖库，不需要安装，可直接使用。

## 2.组件

uni-app 中，常用组件生命周期有：

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroy`
- `destroyed`
- `errorCaptured`

### 1.Options API

在 `zt-button.vue` 中，进行测试。

页面生命周期，在组件的 Options API 中无效。

01-uni-app\demo-project\01-hello-uniapp\components\zt-button\zt-button.vue

```vue
<template>
	<view>
		<view :class="['zt-btn', type]" @click="onBtnClick">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'zt-button',
	props: {
		type: {
			type: String,
			default: 'default' // default primary
		}
	},
	emits: ['btnClick'],
	// 1.组件的生命周期函数
	beforeCreate() {
		console.log('zt-btn beforeCreate')
	},
	created() {
		console.log('zt-btn created')
		console.log(this)
	},
	mounted() {
		console.log('zt-btn mounted')
	},

	// 2.页面的生命周期(在 options api 中是不会执行)
	onLoad() {
		console.log('zt-btn onLoad')
	},
	onShow() {
		console.log('zt-btn onShow')
	},
	methods: {
		onBtnClick() {
			this.$emit('btnClick')
		}
	}
}
</script>
```

### 2.Composition API

在 `zt-button-setup.vue` 中，进行测试。

页面生命周期，在组件的 Composition API 中分情况执行。

01-uni-app\demo-project\01-hello-uniapp\components\zt-button-setup\zt-button-setup.vue

```vue
<template>
	<view>
		<view :class="['zt-btn', type]" @click="onBtnClick">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
// 是组件的生命周期
import { onBeforeMount, onMounted, ref, watch, computed } from 'vue'

// 页面的生命周期
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'

const props = defineProps({
	type: {
		type: String,
		default: 'default'
	}
})

const emit = defineEmits(['btnClick'])

function onBtnClick() {
	emit('btnClick')
}
// 1.是组件的生命周期
onBeforeMount(() => {
	console.log('zt-buton-setup onBeforeMount')
})

onMounted(() => {
	console.log('zt-buton-setup onMounted')
})

// 2.页面的生命周期
// 执行
onLoad(() => {
	console.log('zt-buton-setup onLoad')
})
// 执行
onShow(() => {
	console.log('zt-buton-setup onShow')
})
// 这个在 App H5 没有执行, weapp 有执行
onReady(() => {
	console.log('zt-buton-setup onReady')
})
</script>
```

# 三、网络请求

[官方文档](https://uniapp.dcloud.net.cn/api/request/request.html)

`uni.request(OBJECT)` API，用于发起网络请求。

- 请求的 header 中 `content-type` 默认为 `application/json`

调试网络请求时，要注意：

- 登录各个小程序管理后台，给网络相关的 API 配置合法域名（域名白名单）

- 微信小程序开发工具，在开发阶段可以配置：不校验合法域名；

- 运行到手机时，资源没有出来时可以打开手机的调试模式

## 1.封装

在 service 目录下，对网络请求进行封装。

01-uni-app\demo-project\01-hello-uniapp\service\index.js

```js
const TIMEOUT = 60000
const BASE_URL = 'http://152.136.185.210:7878/api/hy66'

class ZtRequest {
	request(url, method, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				method: method || 'GET',
				timeout: TIMEOUT,
				data,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},

	get(url, params) {
		return this.request(url, 'GET', params)
	}

	post(url, data) {
		return this.request(url, 'POST', data)
	}
}

export default new ZtRequest()
```

## 2.使用

新建一个页面，用于测试发送网络请求。

01-uni-app\demo-project\01-hello-uniapp\pages\category\category.vue

```vue
<template>
	<view>
		<view>1.封装网络请求</view>
		<button @click="fetchData">发起一个 get 请求</button>
		<view>homeData: {{ homeData }}</view>
	</view>
</template>

<script>
import { getHomeMutidata } from '@/service/home.js'
export default {
	data() {
		return {
			homeData: ''
		}
	},
	methods: {
		fetchData() {
			getHomeMutidata().then(res => {
				console.log('category res:', res)
				this.homeData = res.data
			})
		}
	}
}
</script>
```

# 四、数据缓存

API 总结，类似于微信小程序的 API。

[uni.setStorage(OBJECT)](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstorage)

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

[uni.setStorageSync(KEY, DATA)](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync)

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

[uni.getStorage(OBJECT)](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorage)

从本地缓存中异步获取指定 key 对应的内容。

[uni.getStorageSync(KEY)](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstoragesync)

从本地缓存中同步获取指定 key 对应的内容。

[uni.removeStorage(OBJECT)](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestorage)

从本地缓存中异步移除指定 key。

[uni.removeStorageSync(KEY)](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestoragesync)

从本地缓存中同步移除指定 key。

01-uni-app\demo-project\01-hello-uniapp\pages\category\category.vue

```vue
<template>
	<view>
		<view>2.数据的存储</view>
		<button @click="setStorage">set storage</button>
		<button @click="getStorage">get storage</button>
	</view>
</template>

<script>
import { getHomeMutidata } from '@/service/home.js'
export default {
	methods: {
		setStorage() {
			uni.setStorage({
				key: 'userInfo',
				data: {
					name: 'zzt',
					id: '0017',
					token: '666888999'
				}
			})
      uni.setStorageSync('token', 'hahaha666')
		},
		getStorage() {
			uni.getStorage({
				key: 'userInfo',
				success(res) {
					console.log('storage userInfo res:', res)
				}
			})
			const token = uni.getStorageSync('token')
			console.log('storage token:', token)
		}
	}
}
</script>
```

# 五、组件（easycom）

uni-app 组件与 Vue 标准组件基本相同，但是也有区别，比如：

Vue 标准组件，需要”创建“、”引用“、”注册“后才能使用；而 uni-app 的 easycom 组件规范，可以将其精简为一步。

easycom 组件规范：

- 组件需符合 `components/组件名称/组件名称.vue` 的目录结构。

- 符合以上目录结构的 Vue 组件，可不用”引用“、”注册“直接在页面中使用。

创建一个自定义组件 `zt-button.vue`

01-uni-app\demo-project\01-hello-uniapp\components\zt-button\zt-button.vue

```vue
<template>
	<view>
		<view :class="['zt-btn', type]" @click="onBtnClick">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'zt-button',
	props: {
		type: {
			type: String,
			default: 'default' // default primary
		}
	},
	emits: ['btnClick'],
	data() {
		return {}
	},
	methods: {
		onBtnClick() {
			this.$emit('btnClick')
		}
	}
}
</script>

<style>
.zt-btn {
	padding: 20px 0;
	font-size: 40rpx;
	color: #fff;
	text-align: center;
	border-radius: 18rpx;
}

.default {
	background-color: #cdcdcd;
}

.primary {
	background-color: green;
}
</style>
```

在 `category.vue` 中，直接使用 `<zt-button>`

01-uni-app\demo-project\01-hello-uniapp\pages\category\category.vue

```vue
<template>
	<view>
		<view>3.easycom 组件规范</view>
		<zt-button type="primary" @btnClick="handleZtBtnClick">ZTBtn</zt-button>
	</view>
</template>
```

# 六、页面通讯（Composition API）

在 `home.vue` 中进行测试（项目中未测试）。

home.vue

```vue
<template>
	<view>
		<view class="">1.页面传递数据(正向)</view>
		<button type="default" @click="goToDetail01">01-detail01 navigate</button>

		<view class="">2.页面传递数据(逆向)</view>
		<button type="default" @click="goToDetail02">01-detail02 navigate</button>

		<view class="">3.页面逆向传递数据(全局事件总线)</view>
		<button type="default" @click="goToDetail03">01-detail03 navigate</button>
	</view>
</template>

<script setup>
import { onLoad, onUnload } from '@dcloudio/uni-app'

onLoad(() => {
	uni.$on('acceptDataFormDetail03', acceptDataFormDetail03)
})
onUnload(() => {
	uni.$off('acceptDataFormDetail03', acceptDataFormDetail03)
})

function acceptDataFormDetail03(value) {
	console.log('接收到detail03传递给home页面的数据:', value)
}

function goToDetail01() {
	console.log('goToDetail01')
	uni.navigateTo({
		url: '/pages/detail01/detail01?name=liujun&id=100',
		success(res) {
			res.eventChannel.emit('acceptDataFormHomePage', {
				data: '我是home页面传递给detail01的数据'
			})
		}
	})
}

function goToDetail02() {
	uni.navigateTo({
		url: '/pages/detail02/detail02?name=liujun&id=200',
		events: {
			acceptDataFormDetail02(value) {
				console.log('接收到detail02传递过来的数据', value)
			}
		}
	})
}

function goToDetail03() {
	uni.navigateTo({
		url: '/pages/detail03/detail03?name=liujun&id=300'
	})
}
</script>
```

## 1.正向传递

接收有两种方式。

detail01.vue

```vue
<template>
	<view> detail01 </view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 2.方式二: ?name=liujun&id=100
const props = defineProps({
	name: String,
	id: String
})
console.log('在props中接受home传递过来url的数据:', props.name, props.id)

// 1.方式一: ?name=liujun&id=100
// $instance => this
const $instance = ref(getCurrentInstance().proxy)
onLoad(options => {
	console.log('接受到home传递过来url的数据:', options)
	// const eventChannel = this.getOpenerEventChannel();
	const eventChannel = $instance.value.getOpenerEventChannel()
	eventChannel.on('acceptDataFormHomePage', value => {
		console.log('接收到home页面eventchannel传递过来的数据:', value)
	})
})
</script>
```

## 2.逆向传递

detail02.vue

```vue
<template>
	<view>
		<button type="default" @click="goBack">返回</button>
	</view>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'

const $instance = ref(getCurrentInstance().proxy) // this

function goBack() {
	uni.navigateBack({
		delta: 1
	})
	const eventChannel = $instance.value.getOpenerEventChannel()
	// 触发事件, 将detail02的数据传递给Home页面
	eventChannel.emit('acceptDataFormDetail02', {
		data: '这里是detail02传递给Home页面的数据'
	})
}
</script>
```

## 3.事件总线

detail03.vue

```vue
<template>
	<view>
		<button type="default" @click="goBack">返回</button>
	</view>
</template>

<script setup>
function goBack() {
	uni.navigateBack({
		delta: 1
	})

	// 触发事件( 通过事件总线 )
	uni.$emit('acceptDataFormDetail03', {
		data: '这里的数据是从detail03传递到home页面'
	})
}
</script>
```
