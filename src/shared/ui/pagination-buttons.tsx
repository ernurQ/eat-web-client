import { PropsWithChildren, useState, useTransition } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

type Props = {
	currentPage: number
	pageSearchParam: string
	disabled?: boolean
	hasNextPage?: boolean
	className?: string
}

export function PaginationButtons({
	currentPage,
	pageSearchParam,
	disabled,
	hasNextPage,
	className
}: Props) {
	const [isRedirecting, startRedirecting] = useTransition()

	const [pageParams, setPageParams] = useState(
		Array.from({ length: currentPage }, (_, index) => index + 1)
	)
	const setSearchParam = useSetSearchParam()
	const setCurrentPage = (page: number) => {
		startRedirecting(() => {
			setSearchParam({ [pageSearchParam]: `${page}` })
		})
		if (pageParams.length < page) {
			setPageParams(Array.from({ length: page }, (_, index) => index + 1))
		}
	}

	return (
		<div className={cn('flex justify-center gap-5', className)}>
			<ControlButton
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1 || disabled || isRedirecting}
			>
				<AiOutlineArrowLeft />
			</ControlButton>

			{pageParams.map((page) => {
				return (
					<ControlButton
						onClick={() => setCurrentPage(page)}
						key={page}
						isActive={page === currentPage}
						disabled={disabled || isRedirecting || currentPage === page}
					>
						{page}
					</ControlButton>
				)
			})}

			<ControlButton
				onClick={() => {
					setCurrentPage(currentPage + 1)
				}}
				disabled={!hasNextPage || disabled || isRedirecting}
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
