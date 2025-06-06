import { Popconfirm } from 'antd'
import React from 'react'

import {
	deleteProduct,
	invalidateOwnerProductsQuery
} from '@/entities/products'

type Props = {
	productId: string
}

export function DeleteProductButton({ productId }: Props) {
	const onDeleteProduct = async () => {
		await deleteProduct({ productId })
		await invalidateOwnerProductsQuery()
	}

	return (
		<Popconfirm
			onConfirm={onDeleteProduct}
			title={'Вы уверены что хотите удалить этот продукт?'}
			okText={'Да'}
			cancelText={'Отмена'}
		>
			<button
				type='submit'
				className='px-4 py-2 bg-red-500 text-white rounded hover:bg-green-700'
			>
				Удалить
			</button>
		</Popconfirm>
	)
}
