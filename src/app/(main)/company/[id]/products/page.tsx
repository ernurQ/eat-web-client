
"use client"

import { useCatalogProducts } from '@/features/products/catalog/use-catalog-products'
import { ProductsList } from '@/features/products/products-list'

export default function CompanyProducts() {
	const {
		data: products,
		isPending,
	} = useCatalogProducts()

	return <ProductsList products={products} isPending={isPending} gridColNum={5}  />
}
