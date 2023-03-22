<template>
	<view>
		<navigator :delta="1" open-type="navigateBack">
			<button>返回</button>
		</navigator>
		<button @click="goBackHome">返回（API）</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
			console.log('detail02 options:', options);
		},
		methods: {
			goBackHome() {
				uni.navigateBack({
					delta: 1
				})
				
				const eventChannel = this.getOpenerEventChannel()
				eventChannel.emit('detail02SendToHome', {
					data: '我是 detail02 发送过来的数据'
				})
			}
		}
	}
</script>

<style lang="less">

</style>
