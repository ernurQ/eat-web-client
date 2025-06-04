import { api, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

type Data = {
	contactId: string
}

type ResponseData = void

export async function deleteContact(data: Data): Promise<ResponseData> {
	const sellerData = await queryClient.fetchQuery(meQueryOptions())
	const branchId = sellerData.user.branchId

	const { contactId } = data
	await api.delete(`/branches/${branchId}/contacts/${contactId}`)
}
