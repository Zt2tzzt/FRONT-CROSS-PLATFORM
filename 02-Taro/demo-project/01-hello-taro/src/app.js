import { Component } from 'react'
import { Provider } from 'react-redux'
import store from '@/store'
import './app.less'

class App extends Component {
  componentDidMount() {
    console.log('app componentDidMount')
  }

  // taroGlobalData 要放在 componentDidMount 后面，否则会报 lint 警告
  taroGlobalData = { name: 'zzt', age: 18, id: 111 }

  // 应用的生命周期
  onLaunch() {
    console.log('app onLaunch')
  }

  componentDidShow() {
    console.log('app componentDidShow')
  }

  componentDidHide() {
    console.log('app componentDidHide')
  }

  render() {
    // this.props.children 是将要会渲染的页面
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
