type Data = {
	name: string
	description: string
	composition: string
	price: number
	discountPrice: number
	categoryName: string
	branchId: string
	quantity: number
	expirationDate: string
	thumbnail: File
	nutrition: {
		calories: number
		proteins: number
		fats: number
		carbohydrates: number
	}
}

export async functio