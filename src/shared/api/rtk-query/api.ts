import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from './base'

export const eatWebApi = createApi({
	reducerPath: 'eatwebApi',
	baseQuery: baseQuery,
	endpoints: () => ({})
})
