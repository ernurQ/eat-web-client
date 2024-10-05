'use client'

import { Header } from '@/shared/ui'

import { ProductsList, useGetProductsQuery } from '@/entities/product'

export default function CatalogPage() {
	const { data: products } = useGetProductsQuery()

	if (!products) return null

	return (
		<section>
			<Header level={1}>Каталог</Header>
			<ProductsList products={products} />
		</section>
	)
}
