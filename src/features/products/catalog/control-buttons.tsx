import { PropsWithChildren, useState, useTransition } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { CATALOG_PAGE } from '@/features/products/catalog/constants'
import { useCatalogProducts } from '@/features/products/catalog/use-catalog-products'

export function ControlButtons() {
	const { currentPage, isPending, hasNextPage } = useCatalogProducts()
	const [isRedirecting, startRedirecting] = useTransition()

	const [pageParams, setPageParams] = useState(
		Array.from({ length: currentPage }, (_, index) => index + 1)
	)
	const setSearchParam = useSetSearchParam()
	const setCurrentPage = (page: number) => {
		startRedirecting(() => {
			setSearchParam({ [CATALOG_PAGE]: `${page}` })
		})
		if (pageParams.length < page) {
			setPageParams(Array.from({ length: page }, (_, index) => index + 1))
		}
	}

	return (
		<div
			className={
				'flex justify-center gap-5 absolute bottom-0 right-1/2 translate-x-1/2'
			}
		>
			<ControlButton
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1 || isPending || isRedirecting}
			>
				<AiOutlineArrowLeft />
			</ControlButton>

			{pageParams.map((page) => {
				return (
					<ControlButton
						onClick={() => setCurrentPage(page)}
						key={page}
						isActive={page === currentPage}
						disabled={isPending || isRedirecting || currentPage === page}
					>
						{page}
					</ControlButton>
				)
			})}

			<ControlButton
				onClick={() => {
					setCurrentPage(currentPage + 1)
				}}
				disabled={!hasNextPage || isPending || isRedirecting}
			>
				<AiOutlineArrowRight />
			</ControlButton>
		</div>
	)
}

function ControlButton({
	children,
	onClick,
	disabled,
	isActive = false
}: PropsWithChildren & {
	onClick: () => void
	disabled?: boolean
	isActive?: boolean
}) {
	return (
		<button
			className={cn(
				'border-2 border-[#F7C04F] p-1 rounded h-6 w-6',
				'flex justify-center items-center',
				{
					'border-gray-300 text-gray-300': disabled
				},
				{ 'border-[#228536]': isActive }
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
