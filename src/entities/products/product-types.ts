export type Product = {
	id: string
	name: string
	department: {
		id: string
		name: string
	}
	isFavorite: boolean
	price: number
	discount: number
	thumbnail: string
	category: string
	quantity: string
}

export type ProductFullData = Product & {
	description?: string
	expirationDate: string
	composition?: string
	nutrition?: {
		calories?: number
		proteins?: number
		fats?: number
		carbohydrates?: number
	}
}
