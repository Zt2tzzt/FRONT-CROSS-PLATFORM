<template>
	<view>
		<view>1.封装网络请求</view>
		<button @click="fetchData">发起一个 get 请求</button>
		<view>homeData: {{ homeData }}</view>
		
		<view>2.数据的存储</view>
		<button @click="setStorage">set storage</button>
		<button @click="getStorage">get storage</button>
		
		<view>3.easycom 组件规范</view>
		<zt-button type="primary" @btnClick="handleZtBtnClick">ZTBtn</zt-button>
		<zt-button-setup type="info" @btnClick="handleZtBtnSetupClick">ZTBtnSetup</zt-button-setup>
	</view>
</template>

<script>
	import { getHomeMutidata } from '@/service/home.js'
	export default {
		data() {
			return {
				homeData: ''
			};
		},
		methods: {
			fetchData() {
				getHomeMutidata().then(res => {
					console.log('category res:', res)
					this.homeData = res.data
				})
			},
			setStorage() {
				uni.setStorage({
					key: 'userInfo',
					data: {
						name: 'zzt',
						id: '0017',
						token: '666888999'
					}
				}),
				uni.setStorageSync('token', 'hahaha666')
			},
			getStorage() {
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						console.log('storage userInfo res:', res);
					}
				})
				const token = uni.getStorageSync('token')
				console.log('storage token:', token);
			},
			handleZtBtnClick() {
				console.log('zt-btn click');
			},
			handleZtBtnSetupClick() {
				console.log('zt-btn-setup click');
			}
		}
	}
</script>

<style lang="less">

</style>
