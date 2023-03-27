<template>
	<view>
		<!-- 轮播图组件 -->
		<HomeBanner :banners="banners" @bannerItemClick="handleBannerItemClick"></HomeBanner>
		<!-- 推荐 -->
		<HomeRecommend :recommends="recommends" @recommendItemClick="handleRecommendItemClick"></HomeRecommend>
		<!-- 热门 -->
		<HomePopular></HomePopular>
		
		<!-- 选项卡，easycom 组件，直接使用 -->
		<tab-control :titles="['流行', '新款', '精选']" @tabItemClick="handleTabControlClick"></tab-control>
		
	</view>
</template>

<script setup>
	import { useHomeStore } from '@/store/home.js'
	import { storeToRefs } from 'pinia'
	import { onLoad } from '@dcloudio/uni-app'
	
	import HomeBanner from './cpns/home-banner.vue'
	import HomeRecommend from './cpns/home-recommend.vue'
	import HomePopular from './cpns/home-popular.vue'
	
	const homeStore = useHomeStore()
	const { banners, recommends } = storeToRefs(homeStore)
	
	onLoad(() => {
		homeStore.fetchHomeMultiDataAction()
	})
	
	// 轮播图点击
	const handleBannerItemClick = link => {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + link
		})
	}
	
	// 推荐点击
	const handleRecommendItemClick = item => {
		console.log('recommend item:', item);
	}
	
	// 选项卡点击
	const handleTabControlClick = index => {
		console.log('tab control currentIndex:', index);
	}
</script>

<style lang="less">

</style>
