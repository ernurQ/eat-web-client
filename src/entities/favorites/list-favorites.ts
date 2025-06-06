import { queryOptions } from '@tanstack/react-query'

import { api, queryClient } from '@/shared/api'

type ResponseData = Array<{
	id: string
	name: string
	thumbnail: [string]
	price: number
	discount: number
}> | null

export function listFavoritesOptions() {
	return queryOptions({
		queryKey: ['favorite-products'],
		queryFn: () =>
			api
				.get<ResponseData>('/favorites')
				.then((res) => res.data || [])
				.then((products) =>
					products.map(({ thumbnail, ...data }) => {
						return {
							...data,
							thumbnail: `http://localhost/api/products/images/${(thumbnail.at(-1) || '').split('/').slice(1).join('/')}`,
							discountPrice: (data.price * (100 - data.discount)) / 100
						}
					})
				)
	})
}

export async function invalidateFavoritesQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['favorite-products']
	})
}
