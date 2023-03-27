<template>
	<view class="recommend">
		<template v-for="(item) in recommends" :key="item.title">
			<view class="recommend-item" @click="onRecommendItemClick(item)">
				<image class="image" :src="item.image" mode="widthFix"></image>
				<view class="title">{{item.title}}</view>
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
	
	const onRecommendItemClick = (item) => {
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
			font-size: 28rpx;
			
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