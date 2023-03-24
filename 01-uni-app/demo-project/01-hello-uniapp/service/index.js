const TIMEOUT = 6000
const BASE_URL = 'http://123.207.32.32:7888/api/hy66'

class ZtRequest {
	request(url, method, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				method: method || 'GET',
				timeout: TIMEOUT,
				data,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
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