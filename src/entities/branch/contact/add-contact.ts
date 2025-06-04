import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

type Data = {
	type: string
	value: string
	label: string
}

type ResponseData = void

export function addContactOptions() {
	return {
		mutationFn: async (data) => {
			const sellerData = await queryClient.fetchQuery(meQueryOptions())
			const branchId = sellerData.user.branchId

			const { type, value, label } = data
			await api.post(`/branches/${branchId}/contacts`, { type, value, label })
		}
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
