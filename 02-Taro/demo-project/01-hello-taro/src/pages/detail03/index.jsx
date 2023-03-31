import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail03 extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  $instance = Taro.getCurrentInstance(); // 是可以拿到当前的 app 实例，其中有 page 实例，其中有 router 对象

  goBack() {
    Taro.navigateBack({
      deita: 1
    })

    Taro.eventCenter.trigger('detail03ToHome', 'detail03 to home')
  }

  render () {
    return (
      <View className='detail02'>
        <Button onClick={() => this.goBack()}>返回!</Button>
      </View>
    )
  }
}
