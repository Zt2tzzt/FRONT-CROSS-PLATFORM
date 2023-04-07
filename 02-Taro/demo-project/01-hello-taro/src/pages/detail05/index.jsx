import { useEffect, useRef } from 'react'
import { View } from '@tarojs/components'
import Taro, {
  useLoad,
  useDidShow,
  useReady,
  useDidHide,
  useUnload,
  usePullDownRefresh,
  useReachBottom
} from '@tarojs/taro'
import './index.less'

function Detail05() {
  // useRef 存的对象，在整个组件的生命周期中，都是保持同一个对象。
  const $instance = useRef(Taro.getCurrentInstance())
  console.log('router.params=>', $instance.current.router.params)

  // 1.支持组件的生命周期
  useEffect(() => {
    console.log('detail05 useEffect')
    return () => {
      console.log('detail05 useEffect unMount')
    }
  }, [])

  // 2.页面的声明周期
  useLoad(options => {
    console.log('detail05 useLoad', options)
  })
  useDidShow(() => {
    console.log('detail05 useDidShow')
  })
  useReady(() => {
    console.log('detail05 useReady')
  })
  useDidHide(() => {
    console.log('detail05 useDidHide')
  })
  useUnload(() => {
    console.log('detail05 useUnload')
  })
  usePullDownRefresh(() => {
    console.log('detail05 usePullDownRefresh')
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 1000)
  })

  useReachBottom(() => {
    console.log('detail05 useReachBottom')
  })

  return (
    <View className='detail04'>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
      <View className='detail01-item'>item1</View>
    </View>
  )
}

export default Detail05
