<template>
	<view>
		<button @click="onAddNumberClick">加1</button>
		<view>{{ count }}</view>
	</view>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { useCounterStore } from '@/store/counter.js'
	
	const counterStore = useCounterStore()
	const { count } = storeToRefs(counterStore)
	
	const onAddNumberClick = () => {
		counterStore.increment()
	}
	
</script>

<style lang="less">

</style>
