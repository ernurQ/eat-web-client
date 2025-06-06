import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { cn } from '@/shared/lib/classnames'

import {
	addFavoriteOptions,
	deleteFavoriteOptions,
	invalidateFavoritesQuery
} from '@/entities/favorites'

type Props = {
	isFavorite?: boolean
	productId: string
}

export function AddToFavoritesButton({
	productId,
	isFavorite: isFavoriteProp = false
}: Props) {
	const [isFavorite, setIsFavorite] = useState(isFavoriteProp)

	const { mutate: addFavorite, isPending: isAddFavoritePending } = useMutation({
		...addFavoriteOptions(),
		onSuccess: async () => {
			setIsFavorite(true)
			await invalidateFavoritesQuery()
		}
	})

	const { mutate: deleteFavorite, isPending: isDeleteFavoritePending } =
		useMutation({
			...deleteFavoriteOptions(),
			onSuccess: async () => {
				setIsFavorite(false)
				await invalidateFavoritesQuery()
			}
		})

	const onClick = () => {
		if (isFavorite) {
			deleteFavorite({ productId })
		} else {
			addFavorite({ productId })
		}
	}

	return (
		<button
			onClick={onClick}
			disabled={isAddFavoritePending || isDeleteFavoritePending}
			className={'flex-shrink-0'}
		>
			{isFavorite ? (
				<AiFillHeart
					className={cn('text-xl text-red-600', {
						'text-gray-400': isAddFavoritePending || isDeleteFavoritePending
					})}
				/>
			) : (
				<AiOutlineHeart
					className={cn('text-xl', {
						'text-gray-400': isAddFavoritePending || isDeleteFavoritePending
					})}
				/>
			)}
		</button>
	)
}
