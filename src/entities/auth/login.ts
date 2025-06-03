import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'
import { tokenService } from '@/shared/lib/token-service'

type Data = {
	email: string
	password: string
}

type ResponseData = {
	user: {
		token: string
		user: {
			role: 'customer' | 'seller' | 'admin'
		}
	}
}

export function loginOptions() {
	return {
		mutationFn: ({ email, password }) =>
			api
				.post<ResponseData>('/auth/users/login', {
					email,
					password
				})
				.then((res) => res.data)
				.then((data) => {
					tokenService.setAccessToken(data.user.token)
					return data
				})
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
