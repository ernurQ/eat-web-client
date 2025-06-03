'use client'

import { useMutation } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, Modal, Rate } from 'antd'
import { useState } from 'react'
import toast from 'react-hot-toast'

import {
	addBranchReviewOptions,
	invalidateBranchReviewsQuery
} from '@/entities/branch'

type ReviewFormValues = {
	message: string
	rating: number
}

type Props = {
	branchId: string
}

export function ReviewModal({ branchId }: Props) {
	const [open, setOpen] = useState(false)
	const [form] = Form.useForm()

	const { mutate: addReview, isPending } = useMutation({
		...addBranchReviewOptions(),
		onMutate: () => {
			toast.loading('Загрузка', { id: 'add-review-loading' })
		},
		onSettled: () => {
			toast.dismiss('add-review-loading')
		},
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: async () => {
			toast.success('Спасибо за ваш отзыв!')
			form.resetFields()
			setOpen(false)
			await invalidateBranchReviewsQuery()
		}
	})

	const onAddReview: FormProps<ReviewFormValues>['onFinish'] = ({
		message,
		rating
	}) => {
		addReview({
			branchId,
			message,
			rating
		})
	}

	return (
		<>
			<Button
				type='primary'
				onClick={() => setOpen(true)}
				className='bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-md transition-colors'
			>
				Оставить отзыв
			</Button>

			<Modal
				title='Оставить отзыв'
				open={open}
				onCancel={() => setOpen(false)}
				footer={null}
				centered
			>
				<Form
					form={form}
					layout='vertical'
					onFinish={onAddReview}
					initialValues={{ rating: 5 }}
				>
					<Form.Item
						name='rating'
						label='Оценка'
						rules={[
							{ required: true, message: 'Пожалуйста, поставьте оценку' }
						]}
					>
						<Rate allowHalf />
					</Form.Item>

					<Form.Item
						name='message'
						label='Ваш отзыв'
						rules={[
							{ required: true, message: 'Пожалуйста, напишите ваш отзыв' },
							{ min: 10, message: 'Отзыв должен содержать минимум 10 символов' }
						]}
					>
						<Input.TextArea
							rows={4}
							placeholder='Напишите ваш отзыв здесь...'
						/>
					</Form.Item>

					<Form.Item className='text-right'>
						<Button
							type='default'
							onClick={() => setOpen(false)}
							className='mr-2'
						>
							Отмена
						</Button>
						<Button
							type='primary'
							htmlType='submit'
							loading={isPending}
							disabled={isPending}
							className='bg-yellow-500 hover:bg-yellow-600 text-white'
						>
							Отправить
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
