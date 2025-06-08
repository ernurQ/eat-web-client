import { Product } from '@/entities/products'

export type ListItem = Pick<
	Product,
	'id' | 'name' | 'thumbnail' | 'price' | 'discountPrice'
> & {
	branchId?: string
	branchName?: string
	categoryName?: string
}
