<template>
  <view>
    <view class="item">item1</view>
    <view class="item">item2</view>
    <view class="item">item3</view>
    <view class="item">item4</view>
    <view class="item">item5</view>
    <view class="item">item6</view>
    <view class="item">item7</view>
    <view class="item">item8</view>
    <view class="item">item9</view>
    <view class="item">item10</view>
    <view class="item">item11</view>
    <view class="item">item12</view>
    <view class="item">item13</view>
    <view class="item">item14</view>
    <view class="item">item15</view>
    <view class="item">item16</view>
    <view class="item">item17</view>
    <view class="item">item18</view>
    <view class="item">item19</view>
    <view class="item">item20</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      msg: '哈哈'
    }
  },
  onLoad() {
    console.log('detail03 onLoad')
  },
  // 页面的生命周期。
  onShow() {
    console.log('detail04 onShow')
  },
  onReady() {
    console.log('detail04 onReady')
  },
  onHide() {
    console.log('detail04 onHide')
  },
  onUnload() {
    console.log('detail04 onUnload')
  },
  onPullDownRefresh() {
    console.log('detail04 onPullDownRefresh')
  },
  onReachBottom() {
    console.log('detail04 onReachBottom')
  }

  // 组件的生命周期
  /* beforeCreate() {
			console.log('detail04 beforeCreate')
		},
		created() {
			console.log('detail04 created')
		},
		beforeMount() {
			console.log('detail04 beforeMount')
		},
		mounted() {
			console.log('detail04 mounted')
		},
		beforeDestroy() {
			console.log('detail04 beforeDestroy')
		},
		destroyed() 
		console.log('detail04 destroyed'){} */
}
</script>

<style lang="less">
.item {
  height: 200rpx;
  border-bottom: 2rpx solid red;
}
</style>
