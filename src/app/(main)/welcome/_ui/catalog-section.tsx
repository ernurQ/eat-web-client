import { Suspense } from 'react'

import { cn } from '@/shared/lib/classnames'
import { Header } from '@/shared/ui/header'

import { ProductCatalog } from '@/features/products/catalog/product-catalog'

export function CatalogSection() {
	return (
		<section
			className={cn('flex items-center flex-col py-12', 'lg:px-11 xl:px-16')}
		>
			<Header>Каталог</Header>

			<Suspense>
				<ProductCatalog />
			</Suspense>
		</section>
	)
}
