import { useMutation } from '@tanstack/react-query'
import { FaRegTrashAlt } from 'react-icons/fa'

import { cn } from '@/shared/lib/classnames'

import { deleteProductFromCart, invalidateGetCartQuery } from '@/entities/cart'

type Props = {
	productId: string
}

export function DeleteProductFromCartButton({ productId }: Props) {
	const { mutate, isPending } = useMutation({
		mutationFn: () => deleteProductFromCart({ productId }),
		onSuccess: async () => {
			await invalidateGetCartQuery()
		}
	})

	const onDeleteProduct = async () => {
		mutate()
	}

	return (
		<button
			onClick={onDeleteProduct}
			disabled={isPending}
			className={cn('p-1 mt-2', {
				'text-gray-600': isPending
			})}
		>
			<FaRegTrashAlt />
		</button>
	)
}
