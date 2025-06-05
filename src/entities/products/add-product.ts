import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api, queryClient } from '@/shared/api'

import { meQueryOptions } from '@/entities/auth'

type Data = {
	name: string
	description: string
	categoryName: string
	expirationDate: string
	composition: string
	quantity: number
	calories: number
	proteins: number
	fats: number
	carbohydrates: number
	price: number
	discountPrice: number
	thumbnail: File
}

type ResponseData = void

export function addProductOptions() {
	return {
		mutationFn: async (data) => {
			const ownerData = await queryClient.fetchQuery(meQueryOptions())
			const branchId = ownerData.user.branchId

			await api.post(
				'/products',
				{
					branchId,
					name: data.name,
					description: data.description,
					categoryName: data.categoryName,
					expirationDate: data.expirationDate,
					composition: data.composition,
					quantity: data.quantity,
					calories: data.calories,
					proteins: data.proteins,
					fats: data.fats,
					carbohydrates: data.carbohydrates,
					price: data.price,
					discountPrice: data.discountPrice,
					thumbnail: data.thumbnail
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
		}
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
