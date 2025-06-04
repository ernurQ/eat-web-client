import { queryOptions } from '@tanstack/react-query'

import { api, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

type Data = {
	id: string
}

type ResponseData = {
	branch: {
		id: string
		name: string
		description: string
		thumbnail: string
		location: string
	}
}

export function branchInfoQueryOptions(data: Data) {
	const { id } = data
	return queryOptions({
		queryKey: ['branch-info', { id }],
		queryFn: () =>
			api.get<ResponseData>(`/branches/${id}`).then((res) => res.data.branch)
	})
}

export function sellerBranchInfoOptions() {
	return queryOptions({
		queryKey: ['owner-branch-info'],
		queryFn: async () => {
			const data = await queryClient.fetchQuery(meQueryOptions())
			const branchId = data.user.branchId

			return api.get<ResponseData>(`/branches/${branchId}`).then((res) => ({
				...res.data.branch,
				thumbnail: `/backend-api${res.data.branch.thumbnail}`
			}))
		}
	})
}

export async function invalidateSellerBranchInfoQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['owner-branch-info']
	})
}
