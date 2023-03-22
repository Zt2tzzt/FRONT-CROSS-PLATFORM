<template>
	<view>
		<view>1.路由（组件）</view>
		<navigator url="/pages/detail01/detail01" open-type="navigate">
			<button>01-detail navigat</button>
		</navigator>
		
		<navigator url="/pages/detail01/detail01" open-type="redirect">
			<button>02-detail redirect</button>
		</navigator>
		
		<navigator url="/pages/category/category" open-type="switchTab">
			<button>03-category switchTab</button>
		</navigator>
		
		<view>2.路由（API）</view>
		<button @click="gotoDetail01ByNavigate">01-detail navigate</button>
		<button @click="gotoDetail01ByRedirect">02-detail redirect</button>
		<button @click="gotocategoryBySwitchTab">03-category switchTab</button>

		<view>3.页面传递参数（正向）</view>
		<navigator url="/pages/detail01/detail01?name=zzt&age=18" open-type="navigate">
			<button>01-detail navigate</button>
		</navigator>
		<button @click="goToDetail01WithEventChanelForward">01-detail EventChannel forward</button>
		
		<view>3.页面传递参数（逆向）</view>
		<button @click="gotoDetail02WithEventChannelReverse">01-detail02 EventChannel reverse</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			gotoDetail01() {
				uni.navigateTo({
					url: '/pages/detail01/detail01'
				})
			},
			gotoDetail01ByRedirect() {
				uni.redirectTo({
					url: '/pages/detail01/detail01'
				})
			},
			gotocategoryBySwitchTab() {
				uni.switchTab({
					url: '/pages/category/category'
				})
			},
			goToDetail01WithEventChanelForward() {
				uni.navigateTo({
					url: '/pages/detail01/detail01?name=zzt&age=18',
					success(res) {
						res.eventChannel.emit('homeSendToDetail01', {
							data: '我是从 Home 传递过来的！'
						})
					}
				})
			},
			gotoDetail02WithEventChannelReverse() {
				uni.navigateTo({
					url: '/pages/detail02/detail02?name=zzt&age=18',
					events: {
						detail02SendToHome(data) {
							console.log('detail02SendToHome data:', data);
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
