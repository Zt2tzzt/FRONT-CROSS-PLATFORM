import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './modules/home.js'

const store = configureStore({
  reducer: {
    // slice reducer
    home: homeReducer
  }
})
export default store
