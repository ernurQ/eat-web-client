import { IProduct } from '../model/product.model'

import { OrdersListItem } from './Orders-list-item'

interface Props {
	orders: IProduct[]
}

export function OrdersList({ orders }: Props) {
	return (
		<ul>
			{orders.map((order) => (
				<OrdersListItem
					key={order.id}
					order={order}
				/>
			))}
		</ul>
	)
}
