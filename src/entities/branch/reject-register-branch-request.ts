import { api } from '@/shared/api'

type Data = {
	id: string
}

type ResponseData = void

export async function rejectBranchRequest(data: Data) {
	const { id } = data
	return api
		.patch<ResponseData>(`/auth/admin/reject/seller/${id}`)
		.then((res) => res.data)
}
