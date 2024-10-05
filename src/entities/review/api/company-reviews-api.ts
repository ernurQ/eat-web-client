import { eatWebApi } from '@/shared/api'
import { createQueryParams } from '@/shared/utils'

import { IGetCompanyReviews } from '../model/company-reviews-query.model'
import { IReview } from '../model/review.model'

const companyReviewsApi = eatWebApi.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyReviews: builder.query<IReview[], IGetCompanyReviews>({
			query: ({ id, ...pagination }) => {
				if (pagination) {
					const queryParams = createQueryParams(pagination)
					return `/reviews/company/${id}?${queryParams}`
				}
				return `/reviews/company/${id}`
			}
		})
	})
})

export const { useGetCompanyReviewsQuery } = companyReviewsApi
