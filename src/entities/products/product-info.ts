import { queryOptions } from '@tanstack/react-query'

import { api, backendUrl, queryClient } from '@/shared/api'

type Data = {
	productId: string
}

type ResponseData = {
	id: string
	branchId: string
	branchName: string
	branchLocation: string
	branchLocationGeo: {
		coordinates: number[]
	}
	categoryName: string
	name: string
	description: string
	thumbnail: string[]
	price: string
	discountPrice: number
	quantity: number
	expirationDate: string
	composition: string
	calories: number
	proteins: number
	fats: number
	carbohydrates: number
	version: number
}

export function productInfoOptions(data: Data) {
	const { productId } = data
	return queryOptions({
		queryKey: ['product-info', productId],
		queryFn: () =>
			api.get<ResponseData>(`/products/${productId}`).then((res) => ({
				...res.data,
				thumbnail: `${backendUrl}/api/products/images/${(res.data.thumbnail.at(-1) || '').split('/').slice(1).join('/')}`
			}))
	})
}

export async function invalidateProductInfoQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['product-info']
	})
}