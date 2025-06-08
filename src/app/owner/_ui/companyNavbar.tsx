'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'
import { EatWebLogo } from '@/shared/ui/eat-web-logo'
import { useQuery } from '@tanstack/react-query'
import { meQueryOptions } from '@/entities/auth'

export function Navbar() {
	const [showMobileNav, setShowMobileNav] = useState(false)
	const pathname = usePathname()

	const {data} = useQuery(meQueryOptions())


	return (
		<nav className='w-full bg-white shadow-lg z-50'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16'>
				{/* Logo */}
				<Link
					href={routes.welcome()}
					className='flex items-center'
				>
					<EatWebLogo />
				</Link>

				{/* Desktop links */}
				<div className='hidden lg:flex lg:space-x-8'>
					<NavLink
						href={routes.ownerProducts()}
						label='Продукты'
						pathname={pathname}
					/>
					<NavLink
						href={routes.orders()}
						label='Заказы'
						pathname={pathname}
					/>
					<NavLink
						href={routes.ownerAccount()}
						label='Профиль'
						pathname={pathname}
					/>
				</div>

				{/* Right side */}
				<div className='flex items-center space-x-4'>
					<Link
						href={routes.ownerAccount()}
						className='text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition'
					>
						<BsPersonCircle size={24} />
					</Link>

					{data?.user.name ? (
						<span className='hidden lg:inline text-green-700 font-medium truncate max-w-xs'>
							{data.user.branchName}
						</span>
					) : (
						<Link
							href={routes.auth.loginUser()}
							className='text-gray-700 hover:text-green-700 font-medium transition'
						>
							Войти / Регистрация
						</Link>
					)}

					{/* Mobile menu button */}
					<button
						onClick={() => setShowMobileNav((s) => !s)}
						className='lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition'
						aria-label='Toggle menu'
					>
						{showMobileNav ? (
							<AiOutlineClose size={24} />
						) : (
							<AiOutlineMenu size={24} />
						)}
					</button>
				</div>
			</div>

			{/* Mobile slide-in */}
			<MobileNav
				show={showMobileNav}
				pathname={pathname}
				onClose={() => setShowMobileNav(false)}
			/>
		</nav>
	)
}

function NavLink({
	href,
	label,
	pathname
}: {
	href: string
	label: string
	pathname: string
}) {
	const isActive = pathname === href || pathname.startsWith(href + '/')
	return (
		<Link
			href={href}
			className={cn(
				'relative inline-block px-3 py-2 font-medium transition',
				isActive ? 'text-green-800' : 'text-gray-700 hover:text-green-700'
			)}
		>
			{label}
			{isActive && (
				<span className='absolute -bottom-1 left-1/2 w-6 h-1 bg-yellow-400 rounded-full transform -translate-x-1/2' />
			)}
		</Link>
	)
}

function MobileNav({
	show,
	pathname,
	onClose
}: {
	show: boolean
	pathname: string
	onClose: () => void
}) {
	return (
		<div
			className={cn(
				'lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity',
				show
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			)}
			onClick={onClose}
		>
			<div
				className={cn(
					'absolute right-0 top-0 w-64 h-full bg-white p-6 space-y-6 shadow-xl transition-transform',
					show ? 'translate-x-0' : 'translate-x-full'
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<NavLink
					href={routes.ownerProducts()}
					label='Продукты'
					pathname={pathname}
				/>
				<NavLink
					href={routes.orders()}
					label='Заказы'
					pathname={pathname}
				/>
				<NavLink
					href={routes.ownerAccount()}
					label='Профиль'
					pathname={pathname}
				/>

				<div className='pt-4 border-t border-gray-200'>
					{/** Show login / email **/}
					{pathname.startsWith('/owner') && (
						<Link
							href={routes.auth.loginUser()}
							className='block text-gray-700 hover:text-green-700 font-medium transition'
						>
							{`Выйти`}
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
