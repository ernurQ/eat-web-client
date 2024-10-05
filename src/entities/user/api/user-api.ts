import { eatWebApi } from '@/shared/api'

import { IUser } from '../model/user.model'

const userApi = eatWebApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserInfo: builder.query<IUser, void>({
			query: () => '/user/me'
		})
	})
})

export const { useGetUserInfoQuery } = userApi
