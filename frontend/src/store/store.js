import { configureStore } from "@reduxjs/toolkit"
import generalReducer from "../slices/slice"

const store = configureStore({
	reducer: {general: generalReducer},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production'
})

export default store;