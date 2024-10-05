import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getAccessToken } from '@/shared/utils'

const _baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3001/api',
	prepareHeaders: (headers) => {
		const token = getAccessToken()
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	}
})

// @ts-ignore
export const baseQuery = async (...args) => {
	// @ts-ignore
	const result = await _baseQuery(...args)
	if (result.error?.status === 401) {
		// TODO: add refresh token feature
	}
	return result
}
