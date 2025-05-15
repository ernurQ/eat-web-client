'use client'

import { useSearchParams } from 'next/navigation'

import { useProductsQuery } from '@/entities/products'

import {
	// CATALOG_PAGE,
	CATALOG_PRODUCT_CATEGORY,
	CATALOG_PRODUCT_NAME
} from '@/features/products/catalog/constants'

export function useCatalogProducts() {
	const searchParams = useSearchParams()
	const productName = searchParams.get(CATALOG_PRODUCT_NAME) || ''
	const productCategory = searchParams.get(CATALOG_PRODUCT_CATEGORY) || ''
	// const currentPage = +(searchParams.get(CATALOG_PAGE) || 1)

	// const limit = 6
	const result = useProductsQuery({
		name: productName,
		category: productCategory,
		// offset: (currentPage - 1) * limit,
		// limit
	})

	return {
		...result,
		// currentPage,
		// hasNextPage: result.data && result.data.length >= limit
	}
}
