import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'

type Data = {
	thumbnail?: File

	name: string
	categoryName: string
	expirationDate: string
	quantity: number
	price: number
	discountPrice: number

	description: string
	composition: string

	calories: number
	proteins: number
	fats: number
	carbohydrates: number

	productId: string
	branchId: string
}

type ResponseData = void

export function updateProductOptions() {
	return {
		mutationFn: (data) =>
			api.patch(
				`/products/${data.productId}`,
				{
					thumbnail: data.thumbnail,

					name: data.name,
					categoryName: data.categoryName,
					expirationDate: data.expirationDate,
					quantity: data.quantity,
					price: data.price,
					discountPrice: data.discountPrice,

					description: data.description,
					composition: data.composition,

					calories: data.calories,
					proteins: data.proteins,
					fats: data.fats,
					carbohydrates: data.carbohydrates,

					productId: data.productId,
					branchId: data.branchId
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
