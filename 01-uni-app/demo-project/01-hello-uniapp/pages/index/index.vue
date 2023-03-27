<template>
	<view class="content">
		<!-- div 可以用，但是不推荐,不跨平台，且编译效率低 -->
		<div>我是一个 div</div>
		<view class="title">1.全局样式测试</view>
		<view class="name">2.全局样式测试</view>

		<text>我是一个 text 组件</text>
		<text>哈哈</text>

		<button type="primary">我是一个 button</button>

		<!-- 图片，相对路径 -->
		<image class="pic" src="../../static/images/cvy.png" mode="widthFix"></image>
		<!-- 图片：绝对路径 -->
		<image class="pic" src="@/static/images/cvy.png" mode="widthFix"></image>
		<!-- 图片：导入图片 -->、
		<!-- <image class="image" :src="cvy" mode="widthFix"></image> -->

		<scroll-view scroll-y="true" class="zt-v-scroll" :show-scrollbar="false">
			<view class="v-item">item1</view>
			<view class="v-item">item2</view>
			<view class="v-item">item3</view>
			<view class="v-item">item4</view>
			<view class="v-item">item5</view>
			<view class="v-item">item6</view>
			<view class="v-item">item7</view>
		</scroll-view>

		<scroll-view scroll-x="true" class="zt-h-scroll" :show-scrollbar="false">
			<view class="h-item">item1</view>
			<view class="h-item">item2</view>
			<view class="h-item">item3</view>
			<view class="h-item">item4</view>
			<view class="h-item">item5</view>
			<view class="h-item">item6</view>
			<view class="h-item">item7</view>
		</scroll-view>

		<swiper class="zt-swiper" :indicator-dots="true" indicator-active-color="#ffc0cb" indicator-color="#f8f8f8"
			:autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image class="swiper-image" src="@/static/images/banners/banner01.jpeg"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-image" src="@/static/images/banners/banner02.jpeg"></image>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import cvy from '@/static/images/cvy.png'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log('Vue 的实例 this:', this);

			const app = getApp()
			console.log('globalData:', app.globalData);

			const pages = getCurrentPages()
			console.log('page route:', pages[pages.length - 1].route); // pages/index/index
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.pic {
		width: 200rpx;
	}

	.zt-v-scroll {
		height: 400rpx;
		border: 2rpx red solid;
		box-sizing: border-box;

		.v-item {
			height: 200rpx;
			border-bottom: 2rpx solid blue;
		}
	}

	.zt-h-scroll {
		white-space: nowrap;

		// 隐藏原生实现的滚动条。
		/* &::-webkit-scrollbar {
			display: none;
		} */

		:deep(.zt-h-scroll .uni-scroll-view::-webkit-scrollbar) {
			display: none;
		}

		// :global { } 在全局查找选择器

		.h-item {
			display: inline-block;
			height: 200rpx;
			width: 200rpx;
			border-right: 2rpx solid #ffc0cb;
		}
	}
	
	.zt-swiper {
		height: 400rpx;
		
		.swiper-image {
			width: 100%;
			height: 100%;
		}
	}
</style>