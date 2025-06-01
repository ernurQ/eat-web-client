import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'

type Data = {
	name: string
	surname: string
	email: string
	password: string
}

type ResponseData = void

export function registerOptions() {
	return {
		mutationFn: ({ name, surname, email, password }) =>
			api
				.post<ResponseData>('/auth/users/register', {
					name,
					surname,
					email,
					password
				})
				.then((res) => res.data)
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
