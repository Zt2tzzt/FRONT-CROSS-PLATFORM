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

.info {
	background-color: orange;
}
</style>
