import { configureStore } from '@reduxjs/toolkit'

import { eatWebApi } from '@/shared/api'

export const store = configureStore({
	reducer: {
		[eatWebApi.reducerPath]: eatWebApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(eatWebApi.middleware),
	devTools: true
})
