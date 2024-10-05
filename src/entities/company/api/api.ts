import { eatWebApi } from '@/shared/api'

import { IGetCompanyInfo } from '../model/company-query.model'
import { ICompany } from '../model/company.model'

const companyApi = eatWebApi.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyInfo: builder.query<ICompany, IGetCompanyInfo>({
			query: ({ id }) => `/companies/${id}`
		})
	})
})

export const { useGetCompanyInfoQuery } = companyApi
