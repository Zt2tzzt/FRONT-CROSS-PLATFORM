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