export interface IProduct {
	id: string
	name: string
	company: {
		id: string
		name: string
	}
	price: number
	discount: number
	thumbnail: string
	category: string
	quantity: string
}

export interface IProductFullData extends IProduct {
	description: string
	expirationDate: string
	composition: {
		content: string
		calories: number
		proteins: number
		fats: number
		carbohydrates: number
	}
}
