import { combineReducers, configureStore } from "@reduxjs/toolkit"
import generalReducer from "../slices/slice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({ general: generalReducer });

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	}),
	devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store);

export default store;

