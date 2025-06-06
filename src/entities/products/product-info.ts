import { queryOptions } from '@tanstack/react-query'

import { api } from '@/shared/api'

import { Product } from './product-types'

type Data = {
	productId: string
}

type ResponseData = Product

export function productInfoOptions(data: Data) {
	const { productId } = data
	return queryOptions({
		queryKey: ['product-info', productId],
		queryFn: () =>
			api.get<ResponseData>(`/products/${productId}`).then((res) => res.data)
	})
}
