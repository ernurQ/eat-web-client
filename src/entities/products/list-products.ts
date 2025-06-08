import { queryOptions } from '@tanstack/react-query'

import { api, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

import { backendUrl } from '../../shared/api/base'

type Data = {
	page: number
	size: number
	branchId?: string
	name?: string
	category?: string
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

async function getProducts(data: Data) {
	const { page, size, branchId, name, category } = data

	return api
		.get<ResponseData>('/products', {
			params: {
				page,
				limit: size,
				branchId,
				search: name,
				categoryName: category
			}
		})
		.then((res) => ({
			products: res.data.products || [],
			total: res.data.total
		}))
		.then(({ products, total }) => ({
			products: products.map(({ thumbnail, ...data }) => {
				return {
					...data,
					thumbnail: `${backendUrl}/api/products/images/${(thumbnail.at(-1) || '').split('/').slice(1).join('/')}`
				}
			}),
			total
		}))
}

export function listProductsOptions(data: Data) {
	const { page, size, branchId, name, category } = data

	return queryOptions({
		queryKey: ['list-product', { page, size, branchId, name, category }],
		queryFn: () => getProducts(data)
	})
}

export function listOwnerProductsOptions(data: Omit<Data, 'branchId'>) {
	const { page, size, name, category } = data

	return queryOptions({
		queryKey: ['list-owner-product', { page, size, name, category }],
		queryFn: async () => {
			const data = await queryClient.fetchQuery(meQueryOptions())
			const branchId = data.user.branchId

			return getProducts({ page, size, branchId, name, category })
		}
	})
}

export async function invalidateOwnerProductsQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['list-owner-product']
	})
}
