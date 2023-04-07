<script>
export default {
  onLaunch: function (options) {
    console.log('小程序应用启动参数 option：', options)
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    name: 'zzt',
    age: 18
  }
}
</script>

<style lang="less">
/*每个页面公共css */
/* 默认以配置好别名 */
@import url('@/static/css/common.css');
@import url('@/static/css/common.less');
@import url('@/static/custom-font/iconfont.css');
.title {
  color: red;
  border: 5px @mainColor solid;
}

page {
  height: 100%;
  box-sizing: border-box;
  border: 6rpx solid red;
}
</style>
