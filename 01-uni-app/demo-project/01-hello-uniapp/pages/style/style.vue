<template>
  <view class="style-page">
    <view class="bg-view"></view>
    <text class="text iconfont icon-shouye"></text>
    <text class="text iconfont icon-video"></text>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less">
.bg-view {
  height: 200rpx;
  border: 1px #f00 solid;

  background-image: url('~@/static/images/cvy.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.text {
  font-size: 50rpx;
  color: #f00;
}
</style>
