import { eatWebApi } from '@/shared/api'
import { IPaginationParams, createQueryParams } from '@/shared/utils'

import { IProduct } from '../model/product.model'
import { IGetUserCartProducts } from '../model/user-products-query.model'

const userProductsApi = eatWebApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserFavoriteProducts: builder.query<
			IProduct[],
			IPaginationParams | void
		>({
			query: (pagination) => {
				if (pagination) {
					const queryParams = createQueryParams(pagination)
					return `/user/me/favorites?${queryParams}`
				}
				return '/user/me/favorites'
			}
		}),

		getUserCartProducts: builder.query<
			IGetUserCartProducts,
			IPaginationParams | void
		>({
			query: (pagination) => {
				if (pagination) {
					const queryParams = createQueryParams(pagination)
					return `/user/me/cart?${queryParams}`
				}
				return '/user/me/cart'
			}
		}),

		getUserPurchasedProducts: builder.query<
			IProduct[],
			IPaginationParams | void
		>({
			query: (pagination) => {
				if (pagination) {
					const queryParams = createQueryParams(pagination)
					return `/user/me/purchased?${queryParams}`
				}
				return '/user/me/purchased'
			}
		})
	})
})

export const {
	useGetUserFavoriteProductsQuery,
	useGetUserCartProductsQuery,
	useGetUserPurchasedProductsQuery
} = userProductsApi
