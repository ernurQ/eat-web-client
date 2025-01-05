'use client'

import { Suspense } from 'react'

import { FavoriteProducts } from '@/features/products/favorites'

export default function FavoritesPage() {
	return (
		<section className={'py-12'}>
			<Suspense>
				<FavoriteProducts />
			</Suspense>
		</section>
	)
}
