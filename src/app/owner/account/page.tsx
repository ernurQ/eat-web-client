'use client'

import { useQuery } from '@tanstack/react-query'

import { sellerBranchInfoOptions } from '@/entities/branch'

import { BranchThumbnailSection } from '@/app/owner/account/_ui/branch-thumbnail-section'
import { ChangeableDataSection } from '@/app/owner/account/_ui/changeable-data-section'
import { ContactsSection } from '@/app/owner/account/_ui/contacts-section'
import { UnchangeableDataSection } from '@/app/owner/account/_ui/unchangeable-data-section'

export default function CompanyAccountPage() {
	const { isPending } = useQuery(sellerBranchInfoOptions())

	return (
		<div className='min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4'>
			<div className='bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8'>
				<h1 className='text-3xl font-extrabold text-green-700 mb-6'>
					Профиль компании
				</h1>

				{isPending ? (
					<div className={'bg-gray-300 w-full animate-pulse h-96 rounded-lg'} />
				) : (
					<>
						<BranchThumbnailSection />

						<UnchangeableDataSection />

						<ChangeableDataSection />

						<ContactsSection />
					</>
				)}
			</div>
		</div>
	)
}
