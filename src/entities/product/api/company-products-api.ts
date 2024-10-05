import { eatWebApi } from '@/shared/api'
import { createQueryParams } from '@/shared/utils'

import { IGetCompanyProducts } from '../model/company-products-query.model'
import { IProduct } from '../model/product.model'

const companyProductsApi = eatWebApi.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyProducts: builder.query<IProduct[], IGetCompanyProducts>({
			query: ({ id, ...params }) => {
				if (params) {
					const queryParams = createQueryParams({ ...params })
					return `/products/company/${id}?${queryParams}`
				}
				return `/products/company/${id}`
			}
		})
	})
})

export const { useGetCompanyProductsQuery } = companyProductsApi
