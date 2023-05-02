import { configureStore } from '@reduxjs/toolkit'
import   keySlice   from './slices/key.slice'


export default configureStore({
  reducer: {
        key: keySlice
	}
})