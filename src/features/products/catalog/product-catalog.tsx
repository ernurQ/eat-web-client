'use client'

import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'
import { Header } from '@/shared/ui/header'

import { listProductsOptions } from '@/entities/products'

import {
	CATALOG_PAGE,
	CATALOG_PAGE_SIZE,
	CATALOG_PRODUCT_CATEGORY,
	CATALOG_PRODUCT_NAME
} from '@/features/products/catalog/constants'
import { ProductCategorySelect } from '@/features/products/catalog/product-category-select'
import { ProductNameSearch } from '@/features/products/catalog/product-name-search'
import { ProductsList } from '@/features/products/products-list'

import { SelectNearestProducts } from './product-nearest-select'
import { useEffect, useState } from 'react'
import { getDistance } from './get-distance'

export function ProductCatalog() {
	const searchParams = useSearchParams()
	const setSearchParams = useSetSearchParam()
	const currentPage = +(searchParams.get(CATALOG_PAGE) || 1)
	const productName = searchParams.get(CATALOG_PRODUCT_NAME) || undefined
	const productCategory =
		searchParams.get(CATALOG_PRODUCT_CATEGORY) || undefined

	const { data, isPending } = useQuery(
		listProductsOptions({
			page: currentPage,
			size: CATALOG_PAGE_SIZE,
			name: productName,
			category: productCategory
		})
	)

	const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
	const [locationError, setNoLocationError] = useState<boolean>(false);
	const [selectedRange, setSelectedRange] = useState<string>('all')
	const [sortedProducts, setSortedProducts] = useState<any[]>([])

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) =>
				setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
			() => setNoLocationError(true)
		)
	}, [])


	useEffect(() => {
		if (!data?.products || !location) return

		const enriched = data.products.map((product) => {
			const [lng, lat] = product.branchLocationGeo.coordinates
			const distance = getDistance(location.lat, location.lng, lat, lng)
			return { ...product, distance }
		})

		const filtered = enriched.filter((p) => {
			if (selectedRange === '<1') return p.distance < 1
			if (selectedRange === '<3') return p.distance < 3
			if (selectedRange === '>3') return p.distance >= 3
			return true
		})

		const sorted = filtered.sort((a, b) => a.distance - b.distance)

		setSortedProducts(sorted)
	}, [data?.products, location, selectedRange])

	return (
		<div
			className={cn(
				'min-h-[505px] w-full px-4 flex flex-col lg:px-11 xl:px-16',
				'items-center relative pb-10'
			)}
		>
			<Header className={'mx-auto mb-10'}>Каталог</Header>

			<div className="flex justify-between w-full items-center gap-4 flex-wrap">
	<ProductNameSearch />

	{!locationError && (
		<SelectNearestProducts
			selectedRange={selectedRange}
			onSelectRange={setSelectedRange}
		/>
	)}
</div>


			<ProductCategorySelect />

			<ProductsList
				products={locationError ? data?.products :  sortedProducts}
				isPending={isPending}
				className={'mt-10'}
				location={location || undefined}
			/>

			{data?.total !== 0 && (
				<Pagination
					current={currentPage}
					total={data?.total}
					pageSize={CATALOG_PAGE_SIZE}
					align={'center'}
					onChange={(page) =>
						setSearchParams({ [CATALOG_PAGE]: page.toString() })
					}
					style={{ marginTop: 30 }}
				/>
			)}
		</div>
	)
}
