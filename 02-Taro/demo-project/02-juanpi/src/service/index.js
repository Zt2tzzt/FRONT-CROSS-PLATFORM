import Taro from '@tarojs/taro'

const BASE_URL = 'http://codercba.com:9060/juanpi/api'
const TIME_OUT = 10000

class ZtRequest {
  request(url, method, data) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: BASE_URL + url,
        timeout: TIME_OUT,
        method,
        data,
        success: res => {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }

  get(url, params) {
    return this.request(url, 'GET', params)
  }

  post(url, data) {
    return this.request(url, 'POST', data)
  }
}
export default new ZtRequest()
