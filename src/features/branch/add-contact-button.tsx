import { useMutation } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import {
	BranchContact,
	addContactOptions,
	invalidateSellerBranchInfoQuery
} from '@/entities/branch'

type AddContactInputs = Partial<Omit<BranchContact, 'id' | 'branchId'>>

export function AddContactButton() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [form] = Form.useForm()

	const { mutate: addContact } = useMutation({
		...addContactOptions(),
		onMutate: () => {
			toast.loading('Добавляем контакт', { id: 'add-contact-loading' })
		},
		onSettled: () => {
			toast.dismiss('add-contact-loading')
		},
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: async () => {
			toast.success('Контакт был добавлен')
			await invalidateSellerBranchInfoQuery()
			setIsModalOpen(false)
			form.resetFields()
		}
	})

	const onAddContact: FormProps<AddContactInputs>['onFinish'] = (values) => {
		const { type, value, label } = values
		if (type && value && label) {
			addContact({
				type,
				value,
				label
			})
		}
	}

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				type='button'
				className='py-1 px-2 bg-green-600 hover:bg-green-700 text-white text-base rounded-xl
                       shadow-md transition disabled:opacity-50'
			>
				Добавить контакт
			</button>

			<Modal
				title='Оставить отзыв'
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				centered
			>
				<Form
					form={form}
					name={'add-contact-form'}
					onFinish={onAddContact}
				>
					<label>Тип контакта</label>
					<Form.Item
						name={'type'}
						required
					>
						<Select
							options={[
								{ value: 'tel', label: 'Телефон' },
								{ value: 'email', label: 'Эль. почта' },
								{ value: 'instagram', label: 'Инстаграмм' }
							]}
						/>
					</Form.Item>

					<label>Значение</label>
					<Form.Item
						name={'value'}
						required
					>
						<Input type={'text'} />
					</Form.Item>

					<label>Заголовок</label>
					<Form.Item
						name={'label'}
						required
					>
						<Input type={'text'} />
					</Form.Item>

					<div className={'flex justify-center'}>
						<Button htmlType={'submit'}>Создать</Button>
					</div>
				</Form>
			</Modal>
		</>
	)
}
