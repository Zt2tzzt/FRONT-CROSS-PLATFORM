<template>
  <view class="tab-control">
    <template v-for="(title, index) of titles" :key="title">
      <view :class="['item', { active: currentIndex === index }]" @click="onTabItemClick(index)">
        <text class="title">{{ title }}</text>
      </view>
    </template>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

defineProps({
  titles: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['tabItemClick'])

const onTabItemClick = index => {
  currentIndex.value = index
  emit('tabItemClick', index)
}
</script>

<style lang="less">
.tab-control {
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
  margin-top: 10rpx;
  text-align: center;

  .item {
    flex: 1;

    .title {
      display: inline-block;
      padding: 16rpx;
      border-bottom: 6px solid #fff;
    }

    &.active {
      .title {
        color: #ff8198;
        border-bottom: 6px solid #ff8198;
      }
    }
  }
}
</style>
