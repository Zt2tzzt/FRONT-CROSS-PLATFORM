<template>
	<view>
		iid: {{iid}}
	</view>
</template>

<script setup>
	defineProps({
		iid: {
			type: String,
			default: ''
		}
	})
</script>

<style lang="less">

</style>
