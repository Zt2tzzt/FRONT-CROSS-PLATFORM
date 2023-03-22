<template>
	<view class="content">
		
		<!-- #ifdef H5 -->
		<view class="h5">
			<view>show H5</view>
			<img src="@/static/logo.png" alt="">
		</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<view class="weapp">
			<view>show weapp</view>
			<image src="@/static/logo.png" mode=""></image>
		</view>
		<!-- #endif -->
		
		<!-- #ifdef APP-PLUS -->
		<view class="app">
			<view>show app</view>
			<image src="@/static/logo.png" mode=""></image>
		</view>
		<!-- #endif -->
		
		<view class="box">我是一个 box</view>
		
	</view>
</template>

<script>
	export default {
		onLoad() {
			// #ifdef H5
			document.title = 'H5 title'
			// #endif
			
			// #ifdef MP-WEIXIN
			wx.setNavigationBarTitle({
				title: 'WeiXin title'
			})
			// #endif
		},
		onReady() {
			// #ifdef APP-PLUS
			uni.setNavigationBarTitle({
				title: 'App title'
			})
			uni.setNavigationBarColor({
				frontColor: '#fff',
				backgroundColor: '#ff8190'
			})
			console.log('App');
			// #endif
		}
	}
</script>

<style>
.box {
	/* #ifdef H5 */
	color: red;
	/* #endif */
	
	/* #ifdef MP-WEIXIN */
	color: green;
	/* #endif */
	
	/* #ifdef APP-PLUS */
	color: blue;
	/* #endif */
}
</style>
