import { IReview } from '../model/review.model'

interface Props {
	review: IReview
}

export function ReviewsListItem({ review }: Props) {
	return (
		<li className='p-3'>
			<div>{review.user.name + ' ' + review.user.surname}</div>
			<div>{review.content}</div>
		</li>
	)
}
