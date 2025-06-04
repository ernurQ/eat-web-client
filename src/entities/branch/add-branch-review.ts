import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'

type Data = {
	branchId: string
	message: string
	rating: number
}

type ResponseData = void

export function addBranchReviewOptions() {
	return {
		mutationFn: ({ branchId, message, rating }) =>
			api
				.post(`/branches/${branchId}/reviews`, {
					message,
					rating
				})
				.then((res) => res.data)
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
