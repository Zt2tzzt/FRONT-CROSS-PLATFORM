import Taro from "@tarojs/taro";

const TIME_OUT = 60000;
const BASE_URL = "http://123.207.32.32:7888/api/hy66";

class ZtRequest {

  request(url, method, data) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: BASE_URL + url,
        method: method || "GET",
        timeout: TIME_OUT,
        data: data,
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  get(url, params) {
    return this.request(url, "GET", params);
  }

  post(url, data) {
    return this.request(url, "POST", data);
  }
}
export default new ZtRequest();
