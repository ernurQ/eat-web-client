import { queryOptions } from '@tanstack/react-query'

import { api } from '@/shared/api'

type ResponseData = {
	user: {
		id: string
		name: string
		surname: string
		email: string
		confirmed: boolean
		role: 'customer' | 'seller' | 'admin'
		branchName: string
		branchId: string
		bin: string
		phoneNumber: string
		location: string
	}
}

export function meQueryOptions() {
	return queryOptions({
		queryKey: ['me'],
		queryFn: () =>
			api.get<ResponseData>('/auth/users/me').then((res) => res.data)
	})
}
