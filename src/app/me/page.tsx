'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

import { meQueryOptions } from '@/entities/auth'

import { AccountTab } from './ui/account-section'
import { OrdersTab } from './ui/orders-section'
import { Navbar } from '@/app/(main)/_ui/navbar'

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<'orders' | 'account'>('orders')

	const { data } = useQuery(meQueryOptions())

	return (
		<>
			<Navbar />
			<main className='max-w-screen-xl mx-auto px-4 py-6'>
				<div className='flex items-center gap-4 mb-6 p-4 bg-[#CDDF95]'>
					<Image
						src='/images/user/user.png'
						alt='User Avatar'
						width={80}
						height={80}
						className='rounded-full object-cover'
					/>
					<div>
						<h2 className='text-xl font-semibold'>
							{data?.user.name} {data?.user.surname}
						</h2>
					</div>
				</div>

				<div className='flex gap-6 mb-6 border-b pb-2'>
					<button
						onClick={() => setActiveTab('orders')}
						className={
							activeTab === 'orders' ? 'font-semibold text-green-700' : ''
						}
					>
						Мои заказы
					</button>
					<button
						onClick={() => setActiveTab('account')}
						className={
							activeTab === 'account' ? 'font-semibold text-green-700' : ''
						}
					>
						Мой аккаунт
					</button>
				</div>

				{activeTab === 'orders' && <OrdersTab />}
				{activeTab === 'account' && <AccountTab />}
			</main>
		</>
	)
}
