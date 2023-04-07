import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHomeMutidata } from '@/service/home'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 800,
    homeData: null
  },
  reducers: {
    incrementAction(state, action) {
      const { payload } = action
      state.counter += payload
    },
    decrementAction(state, action) {
      const { payload } = action
      state.counter -= payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchHomeMutiDataAction.fulfilled, (state, action) => {
      const { payload } = action
      state.homeData = payload.data
    })
  }
})

export const { incrementAction, decrementAction } = homeSlice.actions
export default homeSlice.reducer

// 异步 action
export const fetchHomeMutiDataAction = createAsyncThunk(
  'home/multidata', // action type 的前缀
  async () => {
    const res = await getHomeMutidata()
    console.log('res=>', res)
    return res
  }
)
