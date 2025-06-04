'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { sellerBranchInfoOptions } from '@/entities/branch'

import { DataInput } from '@/app/owner/account/_ui/data'

export function UnchangeableDataSection() {
	const { data, isPending, isError } = useQuery(sellerBranchInfoOptions())

	if (isPending) {
		return <p>Загрузка...</p>
	}
	if (isError) {
		return <p>Что пошло не так.</p>
	}

	return (
		<section className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
			<DataInput
				label={'Название компаний'}
				value={data.name}
				disabled
			/>

			<DataInput
				label={'Адрес компаний'}
				value={data.location}
				disabled
			/>
		</section>
	)
}
