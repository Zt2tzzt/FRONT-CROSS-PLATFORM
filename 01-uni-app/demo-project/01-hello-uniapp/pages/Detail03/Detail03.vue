<template>
  <view>
    <navigator :delta="1" open-type="navigateBack">
      <button>返回（组件）</button>
    </navigator>
    <button @click="goBackHome">返回（API）</button>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad(options) {
    console.log('detail03 options:', options)
  },
  methods: {
    goBackHome() {
      uni.navigateBack({
        delta: 1
      })

      // 触发一个全局事件（触发前，一定要有监听，否则无效）
      uni.$emit('detail03ToHome', {
        data: 'detail03 传个 home 的数据，by eventBus'
      })
    }
  }
}
</script>

<style lang="less"></style>
