export interface IReview {
	id: string
	user: {
		id: string
		name: string
		surname: string
		profileImage: string
	}
	rating: number
	content: string
}
