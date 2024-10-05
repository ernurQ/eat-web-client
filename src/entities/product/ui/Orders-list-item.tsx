import { IProduct } from '../model/product.model'

interface Props {
	order: IProduct
}

export function OrdersListItem({ order }: Props) {
	return (
		<li className='flex justify-around p-2 my-2 mx-44 bg-green-500 rounded'>
			<div>{order.name}</div>
		</li>
	)
}
