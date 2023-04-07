<template>
  <view class="goods-item" @click="onItemClick">
    <!-- #ifndef H5-->
    <image class="image" :lazy-load="true" :src="itemInfo.show.img" mode="widthFix"></image>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <img class="image" v-lazy="itemInfo.show.img" />
    <!-- #endif -->

    <view class="desc-info">
      <view class="title">{{ itemInfo.title }}</view>
      <view class="info">
        <text class="price">￥{{ itemInfo.price }}</text>
        <image class="icon" src="@/static/images/common/favor.png"></image>
        <text class="cfav">{{ itemInfo.cfav }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  itemInfo: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['itemClick'])

const onItemClick = () => {
  emit('itemClick', props.itemInfo)
}
</script>

<style lang="less">
.goods-item {
  box-sizing: border-box;
  padding: 10px;
  color: #333;

  .image {
    width: 100%;
    border-radius: 10rpx;
  }

  .desc-info {
    margin-top: 6rpx;

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      font-size: 28rpx;
    }

    .info {
      font-size: 26rpx;
      text-align: center;

      .price {
        color: #ff8190;
      }

      .icon {
        width: 30rpx;
        height: 30rpx;
        padding-left: 6px;
        padding-right: 6px;
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>
