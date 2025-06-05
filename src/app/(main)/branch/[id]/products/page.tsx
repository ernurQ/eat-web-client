'use client'

import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'
import { useParams, useSearchParams } from 'next/navigation'

import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { listProductsOptions } from '@/entities/products'

import { ProductsList } from '@/features/products/products-list'

const productsPageKey = 'page'
const productsPageSize = 6

export default function BranchProducts() {
	const { id } = useParams<{ id: string }>()
	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()
	const page = parseInt(searchParams.get(productsPageKey) || '1', 10)

	const { data, isPending } = useQuery(
		listProductsOptions({
			page,
			size: productsPageSize,
			branchId: id
		})
	)

	if (data?.products.length === 0) {
		return null
	}

	return (
		<>
			<ProductsList
				products={data?.products}
				isPending={isPending}
				gridColNum={5}
			/>

			<Pagination
				current={page}
				total={data?.total}
				pageSize={productsPageSize}
				align={'center'}
				onChange={(page) =>
					setSearchParam({ [productsPageKey]: page.toString() })
				}
				style={{ marginTop: 30 }}
			/>
		</>
	)
}
