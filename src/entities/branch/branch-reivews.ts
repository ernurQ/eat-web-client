import { queryOptions } from '@tanstack/react-query'

import { api, queryClient } from '@/shared/api'

type Data = {
	id: string
	page: number
	size: number
}

type ResponseData = {
	reviews: Array<{
		id: string
		branchId: string
		reviewer: {
			id: string
			name: string
		}
		message: string
		rating: number
		date: string
	}>
	total: number
}

export function branchReviewsQueryOptions(data: Data) {
	const { id, page, size } = data

	const offset = (page - 1) * size
	const limit = size

	return queryOptions({
		queryKey: ['branch-reviews', { id, page, size }],
		queryFn: () =>
			api
				.get<ResponseData>(`/branches/${id}/reviews`, {
					params: {
						offset,
						limit
					}
				})
				.then((res) => res.data)
	})
}

export async function invalidateBranchReviewsQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['branch-reviews']
	})
}
