"use client"

import { routes } from "@/shared/config/routes"
import { tokenService } from "@/shared/lib/token-service"
import { useRouter } from "next/navigation"

export function AccountTab() {
	const router = useRouter()

	const handleLogout = () => {
		tokenService.clearAccessToken()
		router.push(routes.auth.loginUser())
	}
	return (
		<div>
			<h3 className='text-lg font-semibold mb-4'>Личные данные</h3>

			{/* Example form for user data */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<label className='block text-sm font-medium'>Имя</label>
					<input
						type='text'
						placeholder='Имя'
						className='border border-gray-300 rounded-2xl p-2 w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>Фамилия</label>
					<input
						type='text'
						placeholder='Фамилия'
						className='border border-gray-300 rounded-2xl p-2 w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>Телефон</label>
					<input
						type='text'
						placeholder='+7...'
						className='border border-gray-300 rounded-2xl p-2 w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>Эл. почта</label>
					<input
						type='email'
						placeholder='Электронная почта'
						className='border border-gray-300 rounded-2xl p-2 w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>Пароль</label>
					<input
						type='password'
						placeholder='********'
						className='border border-gray-300 rounded-2xl p-2 w-full'
					/>
				</div>
			</div>

			{/* Save changes button */}
			<button className='bg-[#BAD36E] text-white py-2 px-4 rounded-2xl mt-4 hover:bg-green-700 transition-colors duration-200'>
				Сохранить
			</button>

			{/* Logout button */}
			<button
				onClick={handleLogout}
				className='block mt-4 bg-red-500 hover:bg-red-900 transition-colors duration-200 rounded-full px-4 py-2 text-white'
			>
				Выйти с аккаунта
			</button>
		</div>
	)
}