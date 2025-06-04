import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

type Data = {
	description: string
}

type ResponseData = void

export function updateBranchDescriptionOptions() {
	return {
		mutationFn: async ({ description }) => {
			const data = await queryClient.fetchQuery(meQueryOptions())
			const branchId = data.user.branchId

			return api.put(`/branches/${branchId}`, {
				description
			})
		}
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
