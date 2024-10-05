'use client'

import { Header } from '@/shared/ui'

import {
	ProductsList,
	useGetUserFavoriteProductsQuery
} from '@/entities/product'

export default function FavoritesPage() {
	const { data: products } = useGetUserFavoriteProductsQuery()

	if (!products) return null

	return (
		<section>
			<Header level={1}>Любимое</Header>
			<ProductsList products={products} />
		</section>
	)
}
