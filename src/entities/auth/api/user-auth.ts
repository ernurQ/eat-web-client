import { eatWebApi } from '@/shared/api'
import { saveAccessToken } from '@/shared/utils'

import {
	IUserLogin,
	IUserLoginResponse,
	IUserRegister
} from '../model/user-auth.model'

const userAuthApi = eatWebApi.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation<IUserLoginResponse, IUserLogin>({
			query: (body) => ({
				method: 'POST',
				url: '/auth/user/login',
				body
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				const { data } = await queryFulfilled
				saveAccessToken(data.token)
			}
		}),

		registerUser: builder.mutation<void, IUserRegister>({
			query: (body) => ({
				method: 'POST',
				url: '/auth/user/register',
				body
			})
		})
	})
})

export const { useLoginUserMutation, useRegisterUserMutation } = userAuthApi
