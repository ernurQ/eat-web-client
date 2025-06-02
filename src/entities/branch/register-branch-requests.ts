import { queryOptions } from '@tanstack/react-query'

import { api, queryClient } from '@/shared/api'

type Data = {
	page: number
	size: number
	name?: string
	bin?: string
	address?: string
}

type ResponseData = {
	sellers: Array<{
		ID: string
		Name: string
		Surname: string
		Email: string
		Role: 'customer' | 'seller' | 'admin'
		Status: 'pending' | 'approved' | 'rejected'
		CompanyName: string
		CompanyID: string
		BIN: string
		Document: string
		PhoneNumber: string
		ProfilePicture: string
		Location: string
	}> | null
	total: number
}

export function registerBranchRequestsQueryOptions(data: Data) {
	const { page, size, name, bin, address } = data
	return queryOptions({
		queryKey: ['pending-sellers', { page, size, name, bin, address }],
		queryFn: () =>
			api
				.get<ResponseData>('/auth/admin/sellers', {
					params: {
						Status: 'pending',
						Page: page,
						Size: size,
						Name: name,
						Bin: bin,
						Location: address
					}
				})
				.then((res) => res.data)
				.then(({ sellers, total }) => ({
					sellers: sellers || [],
					total
				}))
	})
}

export async function invalidateRegisterBranchRequestsQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['pending-sellers']
	})
}
