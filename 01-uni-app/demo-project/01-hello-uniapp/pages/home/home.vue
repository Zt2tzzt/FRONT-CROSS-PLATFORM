<template>
  <view>
    <view>1.路由（组件）</view>
    <navigator url="/pages/detail01/detail01" open-type="navigate">
      <button>01-detail navigat</button>
    </navigator>

    <navigator url="/pages/detail01/detail01" open-type="redirect">
      <button>02-detail redirect</button>
    </navigator>

    <navigator url="/pages/category/category" open-type="switchTab">
      <button>03-category switchTab</button>
    </navigator>

    <view>2.路由（API）</view>
    <button @click="gotoDetail01ByNavigate">01-detail navigate</button>
    <button @click="gotoDetail01ByRedirect">02-detail redirect</button>
    <button @click="gotocategoryBySwitchTab">03-category switchTab</button>

    <view>3.页面传递参数（正向）</view>
    <navigator url="/pages/detail01/detail01?name=zzt&age=18" open-type="navigate">
      <button>01-detail navigate</button>
    </navigator>
    <button @click="goToDetail01WithEventChanelForward">01-detail EventChannel forward</button>

    <view>3.页面传递参数（逆向）</view>
    <button @click="gotoDetail02WithEventChannelReverse">01-detail02 EventChannel reverse</button>
    <button @click="goToDetail03WithEventBus">01-detail03 事件总线</button>

    <view>4.页面的生命周期</view>
    <button @click="goToDetail04">01-detail04 Option API</button>
    <button @click="goToDetail05">01-detail05 Composition API</button>

    <view>5.Composition API 页面传递参数（正向）</view>
    <button @click="gotoDetail06">01-detail06 navigate</button>

    <view>5.Composition API 页面传递参数（逆向）</view>
    <button @click="gotoDetail07">01-detail06 navigate</button>

    <view>5.Composition API 页面传递参数（全局事件总线）</view>
    <button @click="gotoDetail08">01-detail06 navigate</button>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {
    console.log('home onLoad')
    uni.$on('detail03ToHome', this.detail03ToHome)
  },
  onUnload() {
    console.log('home onUnload')
    uni.$off('detail03ToHome', this.detail03ToHome)
  },
  onShow() {
    console.log('home onShow')
  },
  onReady() {
    console.log('home onReady')
  },
  onHide() {
    console.log('home onHide')
  },
  onUnload() {
    console.log('home onUnload')
    uni.$off('acceptDataFromDetail03', this.acceptDataFromDetail03)
  },
  onPullDownRefresh() {
    console.log('home onPullDownRefresh')
  },
  onReachBottom() {
    console.log('home onReachBottom')
  },
  methods: {
    gotoDetail01ByNavigate() {
      uni.navigateTo({
        url: '/pages/detail01/detail01'
      })
    },
    gotoDetail01ByRedirect() {
      uni.redirectTo({
        url: '/pages/detail01/detail01'
      })
    },
    gotocategoryBySwitchTab() {
      uni.switchTab({
        url: '/pages/category/category'
      })
    },
    goToDetail01WithEventChanelForward() {
      uni.navigateTo({
        url: '/pages/detail01/detail01?name=zzt&age=18',
        success(res) {
          res.eventChannel.emit('homeSendToDetail01', {
            data: '我是从 Home 传递过来的！'
          })
        }
      })
    },
    gotoDetail02WithEventChannelReverse() {
      uni.navigateTo({
        url: '/pages/detail02/detail02?name=zzt&age=18',
        events: {
          detail02SendToHome(data) {
            console.log('detail02SendToHome data:', data)
          }
        }
      })
    },
    goToDetail03WithEventBus() {
      uni.navigateTo({
        url: '/pages/Detail03/Detail03'
      })
    },
    detail03ToHome(value) {
      console.log('home on detail03ToHome value:', value)
    },
    goToDetail04() {
      uni.navigateTo({
        url: '/pages/detail04/detail04'
      })
    },
    goToDetail05() {
      uni.navigateTo({
        url: '/pages/detail05/detail05'
      })
    },
    gotoDetail06() {},
    gotoDetail07() {},
    gotoDetail08() {}
  }
}
</script>

<style lang="scss"></style>
