'use client'

import { useMutation } from '@tanstack/react-query'
import { Button, Flex, Form, FormProps, Input } from 'antd'
import toast from 'react-hot-toast'

import {
	addCategoryOptions,
	invalidateCategoriesQuery
} from '@/entities/category'

type Inputs = {
	name?: string
}

export function AddCategoryForm() {
	const { mutateAsync: addCategory, isPending } = useMutation({
		...addCategoryOptions(),
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: async () => {
			await invalidateCategoriesQuery()
		}
	})

	const [form] = Form.useForm()
	const onAddCategory: FormProps<Inputs>['onFinish'] = async (data) => {
		const { name } = data
		if (name) {
			await addCategory({ name })
			form.resetFields()
		}
	}

	return (
		<Form
			onFinish={onAddCategory}
			form={form}
		>
			<Flex
				wrap
				gap={20}
			>
				<Form.Item name={'name'}>
					<Input
						placeholder={'Название категории'}
						disabled={isPending}
					/>
				</Form.Item>
				<Button
					htmlType={'submit'}
					loading={isPending}
					disabled={isPending}
				>
					Добавить
				</Button>
			</Flex>
		</Form>
	)
}
