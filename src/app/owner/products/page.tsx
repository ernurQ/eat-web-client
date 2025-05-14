import { Suspense } from 'react'

import { ProductCatalog } from '@/features/companyProducts/catalog'

export default function products() {
	return (
		<section className={'py-12'}>
			<Suspense>
				<ProductCatalog />
			</Suspense>
		</section>
	)
}
