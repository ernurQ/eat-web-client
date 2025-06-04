import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { sellerBranchInfoOptions } from '@/entities/branch'

import { AddContactButton } from '@/features/branch/add-contact-button'
import { DeleteContactButton } from '@/features/branch/delete-contact-button'

import { DataInput } from '@/app/owner/account/_ui/data'

export function ContactsSection() {
	const {
		data,
		isPending: isBranchDataPending,
		isError
	} = useQuery(sellerBranchInfoOptions())

	if (isBranchDataPending) {
		return <p>Загрузка...</p>
	}
	if (isError) {
		return <p>Что пошло не так.</p>
	}

	return (
		<section className={'mt-10'}>
			<p>Контакты</p>
			<div className={'py-5 '}>
				{data.contacts.map(({ id, type, label, value }) => (
					<div
						key={id}
						className={
							'flex items-end gap-x-10 justify-between first:mt-0 mt-5'
						}
					>
						<DataInput
							label={`(${type}). ${label}`}
							value={value}
							disabled
							className={'grow shrink-0'}
						/>

						<DeleteContactButton contactId={id} />
					</div>
				))}
			</div>

			<AddContactButton />
		</section>
	)
}
