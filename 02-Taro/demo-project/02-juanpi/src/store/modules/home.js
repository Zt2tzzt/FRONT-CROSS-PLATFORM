import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHomeInfoData, getRecommendData, getGoodsData } from '@/service/home'

export const tabTypes = ['specific', 'single']

function getDefaultGoodsList() {
	const goodsListOrigin = {}
	tabTypes.forEach(item => {
		goodsListOrigin[item] = { page: 0, list: [] }
	})
	return goodsListOrigin
}

const homeSlice = createSlice({
	name: 'home',
	initialState: {
		banners: [],
		populars: [],
		recommend: null, // 默认值为 null
		currentTabName: tabTypes[0], // specific
		goodsList: getDefaultGoodsList()
		// goodsList: {
		//   specific: {
		//     // 精选专场
		//     page: 0,
		//     list: [],
		//   },
		//   single: {
		//     // 精选单品
		//     page: 0,
		//     list: [],
		//   },
		// },
	},
	reducers: {
		setCurrentTabName(state, action) {
			const { payload } = action
			// console.log("payload===?", payload);
			state.currentTabName = payload // payload = specific | single
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchHomeInfoDataAction.fulfilled, (state, { payload }) => {
				state.banners = payload.adsInfo.slide_ads.config.slide || []
			})
			.addCase(fetchHomeRecommendDataAction.fulfilled, (state, { payload }) => {
				state.populars = payload.populars || []
				state.recommend = payload.recommend || null
			})
			.addCase(fetchHomeGoodsDataAction.fulfilled, (state, { payload }) => {

				const { type, page, goods } = payload
				if (goods && goods.length) {
					state.goodsList[tabTypes[type]].list = [
						...state.goodsList[tabTypes[type]].list, // old goods
						...goods // new goods
					]
					state.goodsList[tabTypes[type]].page = page
				}
			})
	}
})

export const fetchHomeInfoDataAction = createAsyncThunk(
	'home/info',
	// async (payload, { dispatch, getState }) => {
	async () => {
		const res = await getHomeInfoData()
		return res.data
	}
)

export const fetchHomeRecommendDataAction = createAsyncThunk('home/recommend', async () => {
	const res = await getRecommendData()
	return res.data
})

// 异步的action:  fetchHomeGoodsDataAction({type: 0, page: 1})
export const fetchHomeGoodsDataAction = createAsyncThunk(
	'home/goods', // 会用在异步action的type名的前缀
	async payload => {
		const { type, page } = payload // {type: 0, page: 1}
		// type, // 0 -> 精选专场 ; 1 -> 精选单品
		// page, // 默认为 1 ,拿到第一页的数据
		const res = await getGoodsData(type, page)
		// console.log(res.data);
		return {
			goods: res.data.goods,
			type,
			page
		}
	}
)

// 同步的action
export const { setCurrentTabName } = homeSlice.actions
export default homeSlice.reducer
