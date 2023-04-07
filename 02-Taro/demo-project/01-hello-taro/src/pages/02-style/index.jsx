import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import './no-transform-unit.less'
import styles from './index.module.less'

export default class extends Component {
  render() {
    const lineStyle = {
      fontSize: Taro.pxTransform(30)
    }

    return (
      <View className='02-style'>
        {/* 设计稿及尺寸单位 */}
        <Text className='style-taro'>Hello world!</Text>
        <View className='no-transform-unit'>不转换单位</View>
        <View style={lineStyle}>行内样式 px 的转换</View>

        {/* 全局和局部样式 */}
        <View className={styles['local-style']}>
          编写局部样式
          <View className={styles['name']}>name</View>
        </View>
        <View className='title'>局部样式中编写的全局样式</View>

        {/* 背景图片 */}
        <View className={styles['bg-img']}></View>

        {/* 字体图标 */}
        <Text className='text iconfont icon-shouye'></Text>
        <Text className='text iconfont icon-touxiang-kong'></Text>
      </View>
    )
  }
}
