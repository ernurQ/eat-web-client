'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
	invalidateSellerBranchInfoQuery,
	sellerBranchInfoOptions,
	updateBranchDescriptionOptions
} from '@/entities/branch'

import { DataTextarea } from '@/app/owner/account/_ui/data'

type Inputs = {
	description: string
}

export function ChangeableDataSection() {
	const {
		data,
		isPending: isBranchDataPending,
		isError
	} = useQuery(sellerBranchInfoOptions())

	const { mutate: updateDescription } = useMutation({
		...updateBranchDescriptionOptions(),
		onMutate: () => {
			toast.loading('Обновление', { id: 'update-branch-description-loading' })
		},
		onSettled: () => {
			toast.dismiss('update-branch-description-loading')
		},
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: async () => {
			await invalidateSellerBranchInfoQuery()
		}
	})

	const { register, handleSubmit } = useForm<Inputs>()

	function onChangeBranch({ description }: Inputs) {
		updateDescription({ description })
	}

	if (isBranchDataPending) {
		return <p>Загрузка...</p>
	}
	if (isError) {
		return <p>Что пошло не так.</p>
	}

	return (
		<section className='grid grid-cols-1 gap-6 mt-10'>
			<form
				onSubmit={handleSubmit(onChangeBranch)}
				className='space-y-2'
			>
				<DataTextarea
					label={'Описание компании'}
					defaultValue={data.description}
					{...register('description')}
				/>

				<button
					type='submit'
					className='w-full py-2 bg-green-600 hover:bg-green-700 text-white text-base rounded-xl
                       shadow-md transition disabled:opacity-50'
				>
					{isBranchDataPending ? 'Сохранение…' : 'Обновить описание'}
				</button>
			</form>
		</section>
	)
}
