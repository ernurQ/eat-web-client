import { eatWebApi } from '@/shared/api'

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
			})
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
