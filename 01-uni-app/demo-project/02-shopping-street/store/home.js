import {
	defineStore
} from 'pinia'
import {
	getHomeMutidata
} from '@/service/home.js'

export const useHomeStore = defineStore('home', {
	state: () => ({
		banners: [],
		recommends: []
	}),
	actions: {
		async fetchHomeMultiDataAction() {
			getHomeMutidata().then(res => {
				console.log('getHomeMutidata res:', res);
				this.banners = res.data.banner.list || []
				this.recommends = res.data.recommend.list || []
			})
		}
	}
})