'use client'

import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'
import { useParams, useSearchParams } from 'next/navigation'

import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { branchReviewsQueryOptions } from '@/entities/branch'
import { ReviewModal } from './ReviewModal'

const reviewsPageKey = 'reviews-page'
const reviewsPageSize = 10

export default function BranchReviewsPage() {
	const { id } = useParams<{ id: string }>()

	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()

	const page = parseInt(searchParams.get(reviewsPageKey) || '1', 10)

	const { data, isPending, isError } = useQuery(
		branchReviewsQueryOptions({
			id,
			page,
			size: reviewsPageSize
		})
	)

	const ratingToStars = (rating: number) => {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating)
	}

	if (isPending) {
		return <p>Загрузка...</p>
	}

	if (isError) {
		return <p>Что то пошло не так.</p>
	}

	return (
		<div className='max-w-3xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8 text-center'>Отзывы</h1>
			<div className='my-4 text-start'>
				<ReviewModal />	
			</div>
			{data.reviews.length > 0 ? (
				<div className='space-y-6'>
					{data.reviews.map((review) => (
						<div
							key={review.id}
							className='bg-[#ddf1a1] rounded-lg shadow-md py-1 px-4'
						>
							<div className='flex justify-between items-start'>
								<h3 className='text-xl font-semibold text-gray-800'>
									{review.reviewer.name}
								</h3>
								<div className='text-yellow-500 text-lg'>
									{ratingToStars(review.rating)}
								</div>
							</div>
							<p className='text-gray-700 leading-relaxed whitespace-pre-line'>
								{review.message}
							</p>
							<div className='flex justify-end'>
								<p className='text-gray-700 text-xs'>
									{new Date(review.date).toLocaleString('ru-RU', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit'
									})}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='text-center py-12'>
					<div className='text-gray-500 mb-4'>
						<svg
							className='w-16 h-16 mx-auto text-gray-300'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1}
								d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
							/>
						</svg>
					</div>
					<h3 className='text-xl font-medium text-gray-700 mb-2'>
						Пока нет отзывов
					</h3>
					<p className='text-gray-500 mb-6'>
						Будьте первым, кто оставит отзыв об этом заведении
					</p>
				</div>
			)}

			<Pagination
				current={1}
				total={data.total}
				pageSize={reviewsPageSize}
				align={'center'}
				onChange={(page) =>
					setSearchParam({ [reviewsPageKey]: page.toString() })
				}
			/>
		</div>
	)
}
