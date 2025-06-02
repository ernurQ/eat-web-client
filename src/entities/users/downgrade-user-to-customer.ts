import { api } from '@/shared/api'

type Data = {
	id: string
}

type ResponseData = void

export async function downgradeUserToCustomer({ id }: Data) {
	return await api
		.patch<ResponseData>(`/auth/admin/downgrade/user/${id}`)
		.then((res) => res.data)
}
