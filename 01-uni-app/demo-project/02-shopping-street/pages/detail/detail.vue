<template>
  <view> iid: {{ iid }} </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'

defineProps({
  iid: {
    type: String,
    default: ''
  }
})

onLoad(options => {
  console.log('detail options:', options)
})
</script>

<style lang="less"></style>
