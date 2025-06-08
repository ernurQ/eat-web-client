import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'

type Data = {
	name: string
	bin: string
	phoneNumber: string
	branchName: string
	email: string
	password: string
	city: string
	location: string
	latitude: string
	longitude: string
	document: File
}

type ResponseData = void

export function registerBranchOptions() {
	return {
		mutationFn: ({
			name,
			bin,
			phoneNumber,
			branchName,
			email,
			password,
			city,
			location,
			latitude,
			longitude,
			document
		}) =>
			api
				.post<ResponseData>(
					'/auth/sellers/register',
					{
						name,
						bin,
						phoneNumber,
						branchName,
						email,
						password,
						city,
						location,
						latitude,
						longitude,
						document
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				.then((res) => res.data)
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
