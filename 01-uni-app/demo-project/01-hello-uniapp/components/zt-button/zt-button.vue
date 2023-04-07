<template>
  <view>
    <view :class="['zt-btn', type]" @click="onBtnClick">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'zt-button',
  props: {
    type: {
      type: String,
      default: 'default' // default primary
    }
  },
  emits: ['btnClick'],
  // 1.组件的生命周期函数
  beforeCreate() {
    console.log('zt-btn beforeCreate')
  },
  created() {
    console.log('zt-btn created')
    console.log(this)
  },
  mounted() {
    console.log('zt-btn mounted')
  },
  // 2.页面的生命周期(在 options api 中是不会执行)
  onLoad() {
    console.log('zt-btn onLoad')
  },
  onShow() {
    console.log('zt-btn onShow')
  },
  methods: {
    onBtnClick() {
      this.$emit('btnClick')
    }
  }
}
</script>

<style>
.zt-btn {
  padding: 20px 0;
  font-size: 40rpx;
  color: #fff;
  text-align: center;
  border-radius: 18rpx;
}

.default {
  background-color: #cdcdcd;
}

.primary {
  background-color: green;
}
</style>
