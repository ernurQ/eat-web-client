'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsBasket3, BsPersonCircle } from 'react-icons/bs'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'
import { EatWebLogo } from '@/shared/ui/eat-web-logo'

export function Navbar() {
	const [showMobileNav, setShowMobileNav] = useState<boolean>(false)
	const [userEmail, setUserEmail] = useState<string>('')
	const toggleShowNav = () => setShowMobileNav((show) => !show)

	useEffect(() => {
		async function fetchUser() {
			try {
				const res = await fetch('/api/user/me', { credentials: 'include' })
				if (res.ok) {
					const data = await res.json()
					// If you've added email in your JWT payload:
					setUserEmail(data.user.email)
					// Otherwise, you might only have the userId.
				} else {
					setUserEmail('')
				}
			} catch (error) {
				console.error('Error fetching user:', error)
				setUserEmail('')
			}
		}
		fetchUser()
	}, [])

	return (
		<nav
			className={cn(
				'bg-white w-full flex justify-between items-center h-14 text-base',
				'px-9 sm:px-5 md:px-10',
				'relative overflow-x-clip'
			)}
		>
			<Link href={routes.welcome()}>
				<EatWebLogo />
			</Link>

			<NavList className={cn('hidden sm:flex', 'justify-center gap-10')} />

			<ul className={'flex justify-center items-center gap-5'}>
				<li className={'flex justify-center items-center'}>
					<Link href={routes.cart()}>
						<BsBasket3 />
					</Link>
				</li>
				<li>
					<Link
						href={routes.me()}
						className={'flex justify-center items-center gap-1'}
					>
						<BsPersonCircle />
					</Link>
				</li>
				<li>
					{userEmail ? (
						<span className='font-semibold text-green-700'>{userEmail}</span>
					) : (
						<Link href={routes.authLogin()}>Войти/Зарегистрироваться</Link>
					)}
				</li>

				<li className={cn('sm:hidden', 'flex justify-center items-center')}>
					<button onClick={toggleShowNav}>
						<AiOutlineMenu />
					</button>
				</li>
			</ul>
			<MobileNav show={showMobileNav} />
		</nav>
	)
}

function MobileNav({ show }: { show: boolean }) {
	return (
		<NavList
			className={cn(
				'p-5',
				'absolute top-14 bg-[#cddf95] w-1/3 h-[calc(100vh-3.5rem)]',
				'transition-all duration-300 ease-out -right-1/3',
				{
					'right-0 sm:hidden': show
				}
			)}
		/>
	)
}

function NavList({ className }: { className?: string }) {
	return (
		<ul className={className}>
			<li>
				<Link href={routes.aboutUs()}>О нас</Link>
			</li>
			<li>
				<Link href={routes.catalog()}>Каталог</Link>
			</li>
			<li>
				<Link href={routes.favorite()}>Любимые</Link>
			</li>
			<li>
				<Link href={routes.contacts()}>Контакты</Link>
			</li>
		</ul>
	)
}
