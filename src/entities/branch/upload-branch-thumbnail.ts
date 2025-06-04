import { api, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

type Data = {
	file: File
}

type ResponseData = void

export async function uploadBranchThumbnail({
	file
}: Data): Promise<ResponseData> {
	const data = await queryClient.fetchQuery(meQueryOptions())
	const branchId = data.user.branchId

	await api.patch(
		`/branches/${branchId}/thumbnail`,
		{
			file
		},
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	)
}
