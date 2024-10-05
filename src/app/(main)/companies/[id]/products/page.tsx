'use client'

import { ProductsList, useGetCompanyProductsQuery } from '@/entities/product'

interface Props {
	params: { id: string }
}

export default function CompanyProductsPage({ params: { id } }: Props) {
	const { data: products } = useGetCompanyProductsQuery({ id })

	if (!products) return null

	return (
		<section>
			<ProductsList products={products} />
		</section>
	)
}
