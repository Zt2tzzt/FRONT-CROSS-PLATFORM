import { Component } from 'react'
import { Provider } from 'react-redux'
import store from '@/store'
import './app.less'

class App extends Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
