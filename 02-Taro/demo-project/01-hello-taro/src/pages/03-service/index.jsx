import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getHomeMutidata } from '@/service/home'
import './index.less'

export default class Detail01 extends Component {
  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  getHomeData() {
    getHomeMutidata().then(res => {
      console.log(res)
    })
  }
  setStorage() {
    Taro.setStorage({
      key: 'info',
      data: {
        name: 'zzt',
        id: 111
      }
    })

    Taro.setStorageSync('token', 'sdfdffthsdf')
  }
  getStorage() {
    Taro.getStorage({
      key: 'info',
      success(res) {
        console.log(res.data)
      }
    })
    const token = Taro.getStorageSync('token')
    console.log(token)
  }
  render() {
    return (
      <View className='detail01'>
        <View>1.发起网络请求</View>
        <Button onClick={() => this.getHomeData()}>getHomeData</Button>
        <View>2.本地数据的存储</View>
        <Button onClick={() => this.setStorage()}>setStorage</Button>
        <Button onClick={() => this.getStorage()}>getStorage</Button>
      </View>
    )
  }
}
