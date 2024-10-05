'use client'

import { Header } from '@/shared/ui'

import { OrdersList, useGetUserCartProductsQuery } from '@/entities/product'

export default function CartPage() {
	const { data } = useGetUserCartProductsQuery()

	if (!data) return null

	const { products: orders, total } = data

	return (
		<section>
			<Header level={1}>Корзина</Header>
			<OrdersList orders={orders} />
			<div>total: {total}</div>
		</section>
	)
}
