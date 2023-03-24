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
		onReachBottom,
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
