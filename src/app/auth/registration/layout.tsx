'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'

export default function RegistrationLayout({ children }: PropsWithChildren) {
	const router = useRouter()
	const pathname = usePathname()

	function handleClose() {
		router.back()
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50'>
			<div className='bg-white w-full max-w-md mx-auto rounded-lg p-6 relative'>
				<button
					onClick={handleClose}
					className='absolute top-3 right-3 text-black hover:text-gray-600 text-xl'
				>
					✖
				</button>

				<h1 className='text-2xl font-semibold text-center mb-1'>
					Зарегистрироваться
				</h1>
				<p className='text-center text-gray-600 mb-4'>
					Уже есть аккаунт?{' '}
					<Link
						href={routes.auth.loginUser()}
						className='text-green-700 underline hover:text-green-800'
					>
						Войти
					</Link>
				</p>

				<div className='flex items-center justify-center'>
					<Link
						href={routes.auth.registerUser()}
						className={cn(`border px-4 py-1`, {
							'border-2 border-black': pathname === routes.auth.registerUser()
						})}
					>
						Клиент
					</Link>
					<Link
						href={routes.auth.registerBranch()}
						className={cn(`border px-4 py-1`, {
							'border-2 border-black': pathname === routes.auth.registerBranch()
						})}
					>
						Бизнес
					</Link>
				</div>

				{children}
			</div>
		</div>
	)
}
