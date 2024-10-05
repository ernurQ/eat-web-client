import { IReview } from '../model/review.model'

import { ReviewsListItem } from './Reviews-list-item'

interface Props {
	reviews: IReview[]
}

export function ReviewsList({ reviews }: Props) {
	return (
		<ul>
			{reviews.map((review) => (
				<ReviewsListItem
					key={review.id}
					review={review}
				/>
			))}
		</ul>
	)
}
