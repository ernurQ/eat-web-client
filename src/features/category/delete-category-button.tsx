import { Button, Popconfirm } from 'antd'

import { deleteCategory, invalidateCategoriesQuery } from '@/entities/category'

type Props = {
	categoryId: string
}

export function DeleteCategoryButton({ categoryId }: Props) {
	async function onDeleteCategory() {
		await deleteCategory({ categoryId })
		await invalidateCategoriesQuery()
	}

	return (
		<Popconfirm
			title={'Вы уверены что хотите удалить эту категорию?'}
			cancelText={'Нет'}
			okText={'Да'}
			onConfirm={onDeleteCategory}
		>
			<Button danger>удалить</Button>
		</Popconfirm>
	)
}
