'use client'

import { useMutation } from '@tanstack/react-query'
import { log } from 'console'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { routes } from '@/shared/config/routes'

import { loginOptions } from '@/entities/auth'

type LoginInputs = {
	email: string
	password: string
}

export default function LoginPage() {
	const router = useRouter()

	const { handleSubmit, register } = useForm<LoginInputs>()

	const { mutate: handleLogin } = useMutation({
		...loginOptions(),
		onMutate: () => {
			toast.loading('Вход в систему', { id: 'login-loading' })
		},
		onSettled: () => {
			toast.dismiss('login-loading')
		},
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: (data) => {
			if (data.user.user.role === 'admin') {
				router.push(routes.admin.registerBranchRequests())
			}
			if (data.user.user.role === 'customer') {
				router.push(routes.catalog())
			}
			if (data.user.user.role === 'seller') {
				router.push(routes.ownerAccount())
			}
		}
	})

	function onLogin({ email, password }: LoginInputs) {
		handleLogin({ email, password })
	}

	function onClose() {
		router.back()
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50'>
			<div className='bg-white w-full max-w-md mx-auto rounded-lg p-6 relative'>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-3 right-3 text-black hover:text-gray-600 text-xl'
				>
					✖
				</button>

				{/* Title & Link */}
				<h1 className='text-2xl font-semibold text-center mb-1'>Войти</h1>
				<p className='text-center text-gray-600 mb-4'>
					Впервые на сайте?{' '}
					<Link
						href={routes.auth.registerUser()}
						className='text-green-700 underline hover:text-green-800'
					>
						Зарегистрироваться
					</Link>
				</p>

				{/* Login Form */}
				<form
					onSubmit={handleSubmit(onLogin)}
					className='flex flex-col gap-4'
				>
					<div>
						<label
							htmlFor='email'
							className='block text-gray-700 mb-1'
						>
							Эл. почта
						</label>
						<input
							{...register('email', { required: true })}
							id='email'
							type='email'
							className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
							placeholder='Введите вашу почту'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block text-gray-700 mb-1'
						>
							Пароль
						</label>
						<input
							{...register('password', { required: true })}
							id='password'
							type='password'
							className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
							placeholder='Введите пароль'
							required
						/>
					</div>

					<div className='text-right text-sm text-gray-500'>
						<a
							href='#'
							className='hover:underline'
						>
							Не помню пароль
						</a>
					</div>

					<button
						type='submit'
						className='bg-[#BAD36E] text-white py-2 rounded font-semibold hover:bg-[#90a553] transition-colors'
					>
						Войти
					</button>
				</form>
			</div>
		</div>
	)
}
