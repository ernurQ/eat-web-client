import { queryOptions } from '@tanstack/react-query'

import { api } from '@/shared/api'

type Data = {
	page: number
	size: number
	branchId?: string
}

type ResponseData = {
	products: Array<{
		id: string
		branchId: string
		branchName: string
		categoryName: string
		name: string
		description: string
		thumbnail: Array<string>
		price: number
		discountPrice: number
		quantity: number
		expirationDate: string
		composition: string
		calories: number
		proteins: number
		fats: number
		carbohydrates: number
		version: number
	}> | null
	total: number
}

export function listProductsOptions(data: Data) {
	const { page, size, branchId } = data

	return queryOptions({
		queryKey: ['list-product', { page, size, branchId }],
		queryFn: () =>
			api
				.get<ResponseData>('/products', {
					params: { page, limit: size, branchId }
				})
				.then((res) => ({
					products: res.data.products || [],
					total: res.data.total
				}))
				.then(({ products, total }) => ({
					products: products.map(({ thumbnail, ...data }) => {
						return {
							...data,
							thumbnail: `http://localhost/api/products/images/${(thumbnail.at(0) || '').split('/').slice(1).join('/')}`
						}
					}),
					total
				}))
	})
}
