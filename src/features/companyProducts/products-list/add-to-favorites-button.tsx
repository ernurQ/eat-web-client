import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { cn } from '@/shared/lib/classnames'

import { useAddFavoriteMutation } from '@/entities/products'

type Props = {
	isFavorite: boolean
	productId: string
}

export function AddToFavoritesButton(props: Props) {
	const [isFavorite, setIsFavorite] = useState(props.isFavorite)

	const { mutate, isPending } = useAddFavoriteMutation()

	const onClick = () => {
		mutate(props.productId, {
			onSuccess: () => setIsFavorite((isFavorite) => !isFavorite)
		})
	}

	return (
		<button
			onClick={onClick}
			disabled={isPending}
			className={'flex-shrink-0'}
		>
			{isFavorite ? (
				<AiFillHeart
					className={cn('text-xl text-red-600', { 'text-gray-400': isPending })}
				/>
			) : (
				<AiOutlineHeart
					className={cn('text-xl', { 'text-gray-400': isPending })}
				/>
			)}
		</button>
	)
}
