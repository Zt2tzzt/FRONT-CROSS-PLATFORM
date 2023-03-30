import { Component } from 'react';
// 引用的原生组件，都要导包
import { View, Text, Button, Image, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
// 导入图片
import BannerImg01 from '@/assets/images/banner/banner01.jpeg';
import BannerImg02 from '@/assets/images/banner/banner02.jpeg';
import BannerImg03 from '@/assets/images/banner/banner03.jpeg';
import EmptyCartImg from '@/assets/images/empty_cart.png';
import HomeImg from '../../assets/images/tabbar/home_active.png';
import './index.less';

export default class CpnsTaro extends Component {
  render() {
    return (
      <View>

        <View>
          <Text>我是一个Text</Text>
        </View>

        <Button type='primary'>我是一个Button</Button>

        {/* 图片 <Image> 组件不支持路径引用本地图片，只能导入。 */}
        {/* h5 端用的是图片本身大小，小程序端有默认宽高。 */}
        <Image className='image' src={EmptyCartImg}></Image>
        <Image className='image' src={HomeImg}></Image>
        <Image
          className='image'
          src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
        ></Image>

        {/* ScrollView */}
        <ScrollView scrollY className='v-scroll'>
          <View className='v-item'>item1</View>
          <View className='v-item'>item1</View>
          <View className='v-item'>item1</View>
          <View className='v-item'>item1</View>
          <View className='v-item'>item1</View>
          <View className='v-item'>item8</View>
          <View className='v-item'>item9</View>
          <View className='v-item'>item10</View>
        </ScrollView>

        <ScrollView scrollX className='h-scroll'>
          <View className='h-item'>item1</View>
          <View className='h-item'>item1</View>
          <View className='h-item'>item1</View>
          <View className='h-item'>item1</View>
          <View className='h-item'>item1</View>
          <View className='h-item'>item8</View>
          <View className='h-item'>item9</View>
          <View className='h-item'>item10</View>
        </ScrollView>

        {/* 轮播图组件 */}
        <Swiper className='banner' indicatorDots indicatorActiveColor='#ff464e'>
          <SwiperItem>
            <Image className='banner-img' src={BannerImg01}></Image>
          </SwiperItem>
          <SwiperItem>
            <Image className='banner-img' src={BannerImg02}></Image>
          </SwiperItem>
          <SwiperItem>
            <Image className='banner-img' src={BannerImg03}></Image>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}
