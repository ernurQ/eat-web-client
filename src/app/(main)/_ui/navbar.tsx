'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsBasket3, BsPersonCircle } from 'react-icons/bs'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'
import { EatWebLogo } from '@/shared/ui/eat-web-logo'
import { useQuery } from '@tanstack/react-query'
import { meQueryOptions } from '@/entities/auth'

export function Navbar() {

	const [mobileOpen, setMobileOpen] = useState(false)
	const pathname = usePathname()

	const {data} = useQuery(meQueryOptions())

	return (
		<nav className='left-0 right-0 bg-white shadow-md z-50'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16'>
				{/* Logo */}
				<Link
					href={routes.welcome()}
					className='flex-shrink-0'
				>
					<EatWebLogo />
				</Link>

				{/* Desktop Links */}
				<div className='hidden md:flex space-x-8'>
					<NavItem
						href={routes.aboutUs()}
						label='О нас'
						pathname={pathname}
					/>
					<NavItem
						href={routes.catalog()}
						label='Каталог'
						pathname={pathname}
					/>
					<NavItem
						href={routes.favorite()}
						label='Любимые'
						pathname={pathname}
					/>
					<NavItem
						href={routes.contacts()}
						label='Контакты'
						pathname={pathname}
					/>
				</div>

				{/* Right Side */}
				<div className='flex items-center space-x-4'>
					{/* Cart */}
					<Link
						href={routes.cart()}
						className='p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-gray-100 transition'
					>
						<BsBasket3 size={24} />
					</Link>

					{/* Profile / Login */}
					<Link href={data?.user.name ? routes.me() : routes.auth.loginUser()}>
						<BsPersonCircle
							size={24}
							className='text-gray-600 hover:text-green-700'
						/>
					</Link>
					<Link
						href={data?.user.name ? routes.me() : routes.auth.loginUser()}
						className='flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 transition'
					>
						{data && (
							<span className='hidden lg:inline text-green-700 font-medium truncate max-w-xs'>
								{data?.user.name}
							</span>
						)}
						{!data?.user.name && (
							<span className='hidden lg:inline text-gray-700 hover:text-green-700 font-medium'>
								Войти / Регистрация
							</span>
						)}
					</Link>

					{/* Mobile Menu Toggle */}
					<button
						onClick={() => setMobileOpen((o) => !o)}
						className='md:hidden p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-gray-100 transition'
						aria-label='Toggle navigation'
					>
						{mobileOpen ? (
							<AiOutlineClose size={24} />
						) : (
							<AiOutlineMenu size={24} />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			<MobileNav
				show={mobileOpen}
				pathname={pathname}
				userEmail={data?.user.name}
				onClose={() => setMobileOpen(false)}
			/>
		</nav>
	)
}

function NavItem({
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
				'relative px-3 py-2 font-medium transition',
				isActive ? 'text-green-800' : 'text-gray-700 hover:text-green-700'
			)}
		>
			{label}
			{isActive && (
				<span className='absolute -bottom-1 left-1/2 w-6 h-1 bg-yellow-400 rounded-full transform -translate-x-1/2'></span>
			)}
		</Link>
	)
}

function MobileNav({
	show,
	pathname,
	onClose,
	userEmail
}: {
	show: boolean
	pathname: string
	onClose: () => void
	userEmail: string
}) {
	return (
		<div
			className={cn(
				'fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity',
				show
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			)}
			onClick={onClose}
		>
			<div
				className={cn(
					'absolute top-0 right-0 w-64 h-full bg-white p-6 space-y-6 shadow-xl transition-transform',
					show ? 'translate-x-0' : 'translate-x-full'
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<NavItem
					href={routes.aboutUs()}
					label='О нас'
					pathname={pathname}
				/>
				<NavItem
					href={routes.catalog()}
					label='Каталог'
					pathname={pathname}
				/>
				<NavItem
					href={routes.favorite()}
					label='Любимые'
					pathname={pathname}
				/>
				<NavItem
					href={routes.contacts()}
					label='Контакты'
					pathname={pathname}
				/>
				<NavItem
					href={routes.cart()}
					label='Корзина'
					pathname={pathname}
				/>
				<NavItem
					href={userEmail ? routes.me() : routes.auth.loginUser()}
					label={userEmail ? 'Мой профиль' : 'Войти / Регистрация'}
					pathname={pathname}
				/>
			</div>
		</div>
	)
}
