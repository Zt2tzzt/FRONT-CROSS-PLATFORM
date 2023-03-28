<template>
	<view>
		<!-- 轮播图组件 -->
		<HomeBanner :banners="banners" @bannerItemClick="handleBannerItemClick"></HomeBanner>

		<!-- 推荐 -->
		<HomeRecommend :recommends="recommends" @recommendItemClick="handleRecommendItemClick"></HomeRecommend>

		<!-- 热门 -->
		<HomePopular></HomePopular>

		<!-- 选项卡，easycom 组件，直接使用 -->
		<tab-control :titles="goodsType.map(item => item.label)" @tabItemClick="handleTabControlClick"></tab-control>

		<!-- 宫格 -->
		<uni-grid :column="2" :highlight="false" :showBorder="false" :square="false">
			<template v-for="(item, index) of goodsList[currentType].list" :key="item.iid">
				<uni-grid-item :index="index">
					<grid-item-view :itemInfo="item" @itemClick="handleGridItemClick"></grid-item-view>
				</uni-grid-item>
			</template>
		</uni-grid>

	</view>
</template>

<script setup>
	import goodsType from '@/static/data/home-goods-type.json'
	import {
		useHomeStore
	} from '@/store/home.js'
	import {
		storeToRefs
	} from 'pinia'
	import {
		onLoad, onReachBottom
	} from '@dcloudio/uni-app'

	import HomeBanner from './cpns/home-banner.vue'
	import HomeRecommend from './cpns/home-recommend.vue'
	import HomePopular from './cpns/home-popular.vue'

	const homeStore = useHomeStore()
	const {
		banners,
		recommends,
		goodsList,
		currentType
	} = storeToRefs(homeStore)

	onLoad(() => {
		homeStore.fetchHomeMultiDataAction()

		// 商品数据
		homeStore.fetchHomeGoodsDataAction('pop', 1)
		homeStore.fetchHomeGoodsDataAction('new', 1)
		homeStore.fetchHomeGoodsDataAction('sell', 1)
	})
	
	onReachBottom(() => {
		const type = currentType.value
		const list = goodsList.value
		homeStore.fetchHomeGoodsDataAction(type, list[type].page + 1)
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
		homeStore.changeGoodsType(goodsType[index].name)
	}

	// 商品 item 点击
	const handleGridItemClick = item => {
		uni.navigateTo({
			url: '/pages/detail/detail?iid=' + item.iid
		})
	}
</script>

<style lang="less">

</style>