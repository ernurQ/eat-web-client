import { queryOptions } from '@tanstack/react-query'

import { api, backendUrl, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

export type BranchContact = {
	id: string
	branchId: string
	type: string
	value: string
	label: string
}

type Data = {
	id: string
}

type ResponseData = {
	branch: {
		id: string
		name: string
		description: string
		thumbnail: string[]
		location: string
		contacts: Array<BranchContact>
	}
}

export function branchInfoQueryOptions(data: Data) {
	const { id } = data
	return queryOptions({
		queryKey: ['branch-info', { id }],
		queryFn: () =>
			api.get<ResponseData>(`/branches/${id}`).then((res) => ({
				...res.data.branch,
				thumbnail: `${backendUrl}/api${res.data.branch.thumbnail}`
			}))
	})
}

export function sellerBranchInfoOptions() {
	return queryOptions({
		queryKey: ['owner-branch-info'],
		queryFn: async () => {
			const data = await queryClient.fetchQuery(meQueryOptions())
			const branchId = data?.user?.branchId

			if (!branchId) {
				throw new Error('Branch ID is missing')
			}

			const response = await api.get<ResponseData>(`/branches/${branchId}`)
			return {
				...response.data.branch,
				thumbnail: `${backendUrl}/api${response.data.branch.thumbnail}`
			}
		}
	})
}

export async function invalidateSellerBranchInfoQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['owner-branch-info']
	})
}
