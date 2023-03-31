import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail01 extends Component {

  componentWillMount () { }

  componentDidMount () {
    // 方式一
    console.log('detail01 parms:', this.$instance.router.params);
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  $instance = Taro.getCurrentInstance() // 获取 page 实例，其中有 router 对象。

  onLoad(options) {
    // 方式二
    console.log('detail01 options:', options);

    if (process.env.TARO_ENV === 'weapp') {
      const eventChannel = this.$instance.page.getOpenerEventChannel();
      eventChannel.on('homeToDetail01', data => {
        console.log('detial01 accept home data:', data);
      })
    }
  }

  render () {
    return (
      <View className='detail01'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
