import { api } from '@/shared/api'

type ResponseData = {
	orderId: string
	paymentUrl: string
	status: number
}

export async function buyCartProducts() {
	return await api.post<ResponseData>('/cart/initiate').then((res) => res.data)
}
