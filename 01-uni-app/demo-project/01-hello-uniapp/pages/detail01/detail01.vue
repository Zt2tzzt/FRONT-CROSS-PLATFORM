<template>
  <view> detail01 </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad(options) {
    console.log('detail01 options:', options)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('homeSendToDetail01', data => {
      console.log('detail01 homeSendToDetail01 data:', data)
    })
  }
}
</script>

<style lang="less"></style>
