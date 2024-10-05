import { IProduct } from '../model/product.model'

export interface IGetUserCartProducts {
	products: IProduct[]
	total: number
}
