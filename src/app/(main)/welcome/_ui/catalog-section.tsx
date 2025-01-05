import { Suspense } from 'react'

import { ProductCatalog } from '@/features/products/catalog'

export function CatalogSection() {
	return (
		<section className={'py-12'}>
			<Suspense>
				<ProductCatalog />
			</Suspense>
		</section>
	)
}
