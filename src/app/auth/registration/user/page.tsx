'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { routes } from '@/shared/config/routes'

import { registerOptions } from '@/entities/auth'

type RegisterUserInputs = {
	name: string
	surname: string
	email: string
	password: string
}

export default function RegisterUserPage() {
	const router = useRouter()

	const { handleSubmit, register } = useForm<RegisterUserInputs>()

	const { mutate: registerUser } = useMutation({
		...registerOptions(),
		onMutate: () => {
			toast.loading('Регистрация', { id: 'register-user-loading' })
		},
		onSettled: () => {
			toast.dismiss('register-user-loading')
		},
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: () => {
			toast.success('Вы успешно зарегистрировались')
			router.push(routes.auth.loginUser())
		}
	})

	function onRegisterUser(values: RegisterUserInputs) {
		registerUser(values)
	}

	return (
		<form
			onSubmit={handleSubmit(onRegisterUser)}
			className='flex flex-col gap-4'
		>
			<div className={'mt-5'}>
				<label
					htmlFor='name'
					className='block text-gray-700 mb-1'
				>
					Имя
				</label>
				<input
					{...register('name', { required: true })}
					id='name'
					type='text'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Введите ваше имя'
				/>
			</div>

			<div>
				<label
					htmlFor='surname'
					className='block text-gray-700 mb-1'
				>
					Фамилия
				</label>
				<input
					{...register('surname', { required: true })}
					id='surname'
					type='text'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Введите вашу фамилию'
				/>
			</div>

			<div>
				<label
					htmlFor='email'
					className='block text-gray-700 mb-1'
				>
					Эль. почта
				</label>
				<input
					{...register('email', { required: true })}
					id='email'
					type='email'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Введите вашу эль. почту'
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
				/>
			</div>

			<button
				type='submit'
				className='bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition-colors'
			>
				Зарегистрироваться
			</button>
		</form>
	)
}
