import { Suspense } from 'react'

import { ProductCatalog } from '@/features/products/catalog/product-catalog'

export default function CatalogPage() {
	return (
		<section className={'py-12'}>
			<Suspense>
				<ProductCatalog />
			</Suspense>
		</section>
	)
}
