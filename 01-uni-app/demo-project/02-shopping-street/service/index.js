const TIME_OUT = 60000
const BASE_URL = 'http://123.207.32.32:7888/api/hy66'

class ZtRequest {
	constructor(timeout, baseUrl) {
		this.timeout = timeout
		this.baseUrl = baseUrl
	}

	request(url, method = 'GET', data = {}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.timeout + url,
				method,
				timeout: this.baseUrl,
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
export default new ZtRequest(TIME_OUT, BASE_URL)
