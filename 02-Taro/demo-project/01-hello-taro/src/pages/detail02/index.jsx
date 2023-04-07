import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail02 extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  $instance = Taro.getCurrentInstance() // 是可以拿到当前的 app 实例，其中有 page 实例，其中有 router 对象

  goBack() {
    Taro.navigateBack({
      deita: 1
    })

    if (process.env.TARO_ENV === 'weapp') {
      // 互殴 page 实例的另一种方式
      /* const pages = Taro.getCurrentPages()
      const page = pages[pages.length - 1] */

      const eventChannel = this.$instance.page.getOpenerEventChannel()
      eventChannel.emit('detail02ToHome', 'detail02 to home')
    }

    Taro.eventCenter.trigger('detail02ToHome', 'detail02 to home')
  }

  render() {
    return (
      <View className='detail02'>
        <Button onClick={() => this.goBack()}>返回!</Button>
      </View>
    )
  }
}
