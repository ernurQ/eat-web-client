import { eatWebApi } from '@/shared/api'
import { createQueryParams } from '@/shared/utils'

import { IProduct, IProductFullData } from '../model/product.model'
import { IGetOneProduct, IGetProducts } from '../model/products-query.model'

const productsApi = eatWebApi.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<IProduct[], IGetProducts | void>({
			query: (params) => {
				if (params) {
					const queryParams = createQueryParams({ ...params })
					return `/products?${queryParams}`
				}
				return '/products'
			}
		}),

		getOneProduct: builder.query<IProductFullData, IGetOneProduct>({
			query: ({ id }) => `/products/${id}`
		})
	})
})

export const { useGetProductsQuery, useGetOneProductQuery } = productsApi
