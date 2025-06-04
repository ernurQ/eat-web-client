import { api } from '@/shared/api'

type Data = {
	categoryId: string
}

type ResponseData = void

export async function deleteCategory(data: Data): Promise<ResponseData> {
	const { categoryId } = data
	await api.delete(`/products/categories/${categoryId}`)
}
