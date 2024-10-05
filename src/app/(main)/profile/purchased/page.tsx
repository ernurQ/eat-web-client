'use client'

import {
	OrdersList,
	useGetUserPurchasedProductsQuery
} from '@/entities/product'

export default function PurchasedProductsPage() {
	const { data: orders } = useGetUserPurchasedProductsQuery()

	if (!orders) return null

	return (
		<>
			<OrdersList orders={orders} />
		</>
	)
}
