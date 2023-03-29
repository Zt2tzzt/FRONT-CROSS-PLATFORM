import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro';
import './index.less'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () {
    console.log('全局常量 VERSION:', VERSION);
    const app = Taro.getApp() // 不需要这样写：app.globalData.name
    console.log('app name:', app.name);
    console.log('app age:', app.age);
    console.log('app id:', app.id);
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index global-style'>
        <Text>Hello world haha!</Text>
      </View>
    )
  }
}
