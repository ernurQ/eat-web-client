'use client'

import { ReviewsList, useGetCompanyReviewsQuery } from '@/entities/review'

interface Props {
	params: { id: string }
}

export default function CompanyReviewsPage({ params: { id } }: Props) {
	const { data: reviews } = useGetCompanyReviewsQuery({ id })

	if (!reviews) return null

	return (
		<section>
			<ReviewsList reviews={reviews} />
		</section>
	)
}
