import { IPaginationParams } from '@/shared/utils'

export interface IGetProducts extends IPaginationParams {
	category?: string
	name?: string
}

export interface IGetOneProduct {
	id: string
}
