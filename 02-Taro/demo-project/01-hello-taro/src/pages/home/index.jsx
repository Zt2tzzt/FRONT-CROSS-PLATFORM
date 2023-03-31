import { Component } from 'react'
import { View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

  onLoad() {
    Taro.eventCenter.on('detail03ToHome', this.detail03ToHome)
  }

  onUnload() {
    Taro.eventCenter.off('detail03ToHome', this.detail03ToHome)
  }

  detail03ToHome(data) {
    console.log('home accept detail03 data:', data);
  }

  goToDetail01ByNavigate() {
    Taro.navigateTo({
      url: '/pages/detail01/index'
    })
  }

  goToDetail01ByRedirect() {
    Taro.redirectTo({
      url: "/pages/detail01/index"
    })
  }

  goToCategoryByNavigate() {
    Taro.switchTab({
      url: '/pages/category/index'
    })
  }

  getDetail01WithEventChannel() {
    Taro.navigateTo({
      url: '/pages/detail01/index?name=zzt&age=18',
      success(res) {
        if (process.env.TARO_ENV === 'weapp') {
          // 仅支持小程序
          res.eventChannel.emit('homeToDetail01', {
            data: 'home to detail01'
          })
        }
      }
    })
  }

  goToDetail02WithEventChannel() {
    Taro.navigateTo({
      url: '/pages/detail02/index',
      // 仅支持小程序
      events: {
        detail02ToHome(data) {
          console.log('home accept detail02 data:', data);
        }
      }
    })
  }

  goToDetail04() {
    Taro.navigateTo({
      url: "/pages/detail04/index",
    });
  }

	render() {
		return (
			<View className='home'>
				<View>1.页面跳转（组件）</View>
				<Navigator url='/pages/detail01/index' openType='navigate'>
					<Button>goToDetail01 navigate</Button>
				</Navigator>
				<Navigator url='/pages/detail01/index' openType='redirect'>
					<Button>goToDetail01 redirect</Button>
				</Navigator>
				<Navigator url='/pages/category/index' openType='switchTab'>
					<Button>goToCategory switchTab</Button>
				</Navigator>

        <View>2.页面跳转（API）</View>
        <Button onClick={() => this.goToDetail01ByNavigate()}>goToDetail01 navigate</Button>
        <Button onClick={() => this.goToDetail01ByRedirect()}>goToDetail01 redirect</Button>
        <Button onClick={() => this.goToCategoryByNavigate()}>goToCategory switchTab</Button>

        <View>3.页面传递数据（正向）</View>
        <Button onClick={() => this.getDetail01WithEventChannel()}>goToDetail01 eventChannel</Button>

        <View>4.页面传递数据（逆向）</View>
        <Button onClick={() => this.goToDetail02WithEventChannel()}>goToDetail02 eventChannel</Button>
        <Navigator url='/pages/detail03/index' openType='navigate'>
          <Button>goToDetail03 Taro.eventCenter</Button>
        </Navigator>

        <View>5.页面生命周期</View>
        <Navigator url='/pages/detail04/index' openType='navigate'>
          <Button>goToDetail04 class</Button>
        </Navigator>
        <Navigator url='/pages/detail05/index?name=zzt' openType='navigate'>
          <Button>goToDetail05 hook</Button>
        </Navigator>

        <View>6.网络请求和数据存储</View>
        <Navigator url='/pages/03-service/index' openType='navigate'>
          <Button>网络请求和数据存储</Button>
        </Navigator>


			</View>
		)
	}
}
