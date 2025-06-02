import { api } from '@/shared/api'

type Data = {
	id: string
}

type ResponseData = void

export async function upgradeUserToAdmin({ id }: Data) {
	return await api
		.patch<ResponseData>(`/auth/admin/upgrade/user/${id}`)
		.then((res) => res.data)
}
