import { Product } from '@/entities/products/product-types'

export interface CartProduct extends Product {
	id: string
	thumbnail: string
	name: string
	price: number
	quantity: number
	maxQuantity: number
}
