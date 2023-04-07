<template>
  <view class="content">
    <button @click="onAddNumber">加1</button>
    <button @click="onSubNumber">减1</button>
    <view>{{ count }}</view>
    <navigator url="/pages/detail09/detail09">
      <button>GoToDetail09</button>
    </navigator>
  </view>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/counter.js'

const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)

const onAddNumber = () => {
  counterStore.increment()
}
const onSubNumber = () => {
  counterStore.decrement()
}
</script>

<style lang="less"></style>
