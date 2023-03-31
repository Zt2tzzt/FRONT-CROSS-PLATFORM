import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail04 extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onLoad() {
    console.log("detail04 onLoad");
  }
  componentDidShow() {
    console.log("detail04 componentDidShow");
  }
  onReady() {
    console.log("detail04 onReady");
  }
  componentDidHide() {
    console.log("detail04 componentDidHide");
  }
  onUnload() {
    console.log("detail04 onUnload");
  }
  onPullDownRefresh() {
    console.log("detail04 onPullDownRefresh");
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  }
  onReachBottom() {
    console.log("detail04 onReachBottom");
  }

  render () {
    return (
      <View className='detail04'>
        <View className='item'>item1</View>
        <View className='item'>item2</View>
        <View className='item'>item3</View>
        <View className='item'>item4</View>
        <View className='item'>item5</View>
        <View className='item'>item6</View>
        <View className='item'>item7</View>
        <View className='item'>item8</View>
        <View className='item'>item9</View>
        <View className='item'>item10</View>
        <View className='item'>item11</View>
        <View className='item'>item12</View>
        <View className='item'>item13</View>
        <View className='item'>item14</View>
        <View className='item'>item15</View>
      </View>
    )
  }
}
