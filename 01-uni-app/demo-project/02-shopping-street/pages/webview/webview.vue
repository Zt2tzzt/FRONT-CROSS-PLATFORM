<template>
	<web-view :src="link"></web-view>
</template>

<script setup>
	defineProps({
		link: {
			type: String,
			default: ''
		}
	})
</script>

<style lang="less">

</style>
