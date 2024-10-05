import { IProduct } from '../model/product.model'

import { ProductsListItem } from './Products-list-item'

interface Props {
	products: IProduct[]
}

export function ProductsList({ products }: Props) {
	return (
		<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
			{products.map((product) => (
				<ProductsListItem
					key={product.id}
					product={product}
				/>
			))}
		</ul>
	)
}
