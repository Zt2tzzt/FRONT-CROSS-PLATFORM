import goodsType from '@/static/data/home-goods-type.json'
import { defineStore } from 'pinia'
import { getHomeMutidata, getHomeGoodsData } from '@/service/home.js'

export const useHomeStore = defineStore('home', {
	state: () => ({
		banners: [],
		recommends: [],
		currentType: goodsType[0].name,
		goodsList: goodsType.reduce((accumulate, currentItem) => {
			accumulate[currentItem.name] = {
				page: 0,
				list: []
			}
			return accumulate
		}, {})
		/* 
		{
			pop: {
				page: 0,
				list: []
			},
			new: {
				page: 0,
				list: []
			},
			sell: {
				page: 0,
				list: []
			}
		} */
	}),
	actions: {
		fetchHomeMultiDataAction() {
			getHomeMutidata().then(res => {
				console.log('getHomeMutidata res:', res)
				this.banners = res.data.banner.list || []
				this.recommends = res.data.recommend.list || []
			})
		},
		fetchHomeGoodsDataAction(type, page) {
			getHomeGoodsData(type, page).then(res => {
				console.log('fetchHomeGoodsDataAction res:', res)
				this.goodsList[type].list = this.goodsList[type].list.concat(
					res.data.list
				)
				this.goodsList[type].page = page
			})
		},
		changeGoodsType(type) {
			this.currentType = type
		}
	}
})
