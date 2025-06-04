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
		id: string
		name: string
		surname: string
		email: string
		role: 'customer' | 'seller' | 'admin'
		status: 'pending' | 'approved' | 'rejected'
		branchName: string
		branchId: string
		bin: string
		document: string
		phoneNumber: string
		profilePicture: string
		location: string
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
					sellers: (sellers || []).map(({ document, ...data }) => ({
						...data,
						document: `/auth/admin/sellers/${document}`
					})),
					total
				}))
	})
}

export async function invalidateRegisterBranchRequestsQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['pending-sellers']
	})
}
