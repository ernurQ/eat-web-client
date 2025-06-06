export type Product = {
	id: string
	branchId: string
	branchName: string
	categoryName: string
	name: string
	description: string
	thumbnail: string
	price: number
	discountPrice: number
	quantity: number
	expirationDate: string
	composition: string
	calories: number
	proteins: number
	fats: number
	carbohydrates: number
	version: number
}

export type FavoriteProduct = {
	id: string
	name: string
	thumbnail: string
	price: number
	discount: number
}
