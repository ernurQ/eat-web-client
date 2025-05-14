'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoTrashBinSharp } from 'react-icons/io5'

import { routes } from '@/shared/config/routes'

export default function RegisterPage() {
	const router = useRouter()
	// CLIENT CREDENTIALS
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	const [isCompany, setIsCompany] = useState(false)

	// COMPANY CREDENTIALS
	const [companyName, setCompanyName] = useState('')
	const [IINBIN, setIINBIN] = useState('')
	const [contactPerson, setContaactPerson] = useState('')
	const [companyPhone, setCompanyPhone] = useState('')
	const [companyEmail, setCompanyEmail] = useState('')
	const [companyPassword, setCompanyPassword] = useState('')
	const [fileName, setFileName] = useState('')

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			setFileName(file.name)
		} else {
			setFileName('')
		}
	}

	const removeFile = () => {
		setFileName('')
	}

	function handleClose() {
		router.back()
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			})

			if (res.ok) {
				router.push('/auth/login')
			} else {
				const data = await res.json()
				setErrorMsg(data.error || 'Failed to register')
			}
		} catch (error) {
			console.error('Registration Error', error)
			setErrorMsg('Something went wrong')
		}
	}

	async function handleSubmitCompany() {}

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
						href={routes.authLogin()}
						className='text-green-700 underline hover:text-green-800'
					>
						Войти
					</Link>
				</p>

				<div className='flex items-center justify-center'>
					<button
						className={`${!isCompany && 'border-2 border-black'} border px-4 py-1`}
						onClick={() => setIsCompany(false)}
					>
						Клиент
					</button>
					<button
						className={`${isCompany && 'border-2 border-black'} border px-4 py-1`}
						onClick={() => setIsCompany(true)}
					>
						Бизнес
					</button>
				</div>

				{isCompany ? (
					<form
						onSubmit={handleSubmitCompany}
						className='flex flex-col gap-4'
					>
						{errorMsg && <div className='text-red-500 text-sm'>{errorMsg}</div>}

						<div>
							<input
								id='text'
								type='text'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='Название компании'
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								required
							/>
						</div>

						<div>
							<input
								id='text'
								type='text'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='ИИН или БИН'
								value={IINBIN}
								onChange={(e) => setIINBIN(e.target.value)}
								required
							/>
						</div>

						<div>
							<input
								id='text'
								type='text'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='Контактное лицо'
								value={contactPerson}
								onChange={(e) => setContaactPerson(e.target.value)}
								required
							/>
						</div>

						<div>
							<input
								id='tel'
								type='tel'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='Номер телефона'
								value={companyPhone}
								onChange={(e) => setCompanyPhone(e.target.value)}
								required
							/>
						</div>

						<div>
							<input
								id='email'
								type='email'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='Эл. почта'
								value={companyEmail}
								onChange={(e) => setCompanyEmail(e.target.value)}
								required
							/>
						</div>

						<div>
							<input
								id='password'
								type='password'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='Пароль'
								value={companyPassword}
								onChange={(e) => setCompanyPassword(e.target.value)}
								required
							/>
						</div>

						<div>
							<label
								htmlFor='file'
								className='flex justify-center items-center border py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100 transition'
							>
								Загрузить документ (по желанию)
							</label>
							<input
								id='file'
								type='file'
								onChange={handleFileChange}
								className='hidden'
							/>

							{fileName && (
								<div className='flex gap-4'>
									<p className='font-medium'>{fileName}</p>
									<button
										type='button'
										onClick={removeFile}
										className='text-red-500 hover:text-red-700 transition'
										title='Удалить файл'
									>
										<IoTrashBinSharp />
									</button>
								</div>
							)}
						</div>

						<button
							type='submit'
							className='bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition-colors'
						>
							Зарегистрироваться
						</button>
					</form>
				) : (
					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-4'
					>
						{errorMsg && <div className='text-red-500 text-sm'>{errorMsg}</div>}

						<div>
							<label
								htmlFor='email'
								className='block text-gray-700 mb-1'
							>
								Эл. почта
							</label>
							<input
								id='email'
								type='email'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='Введите вашу почту'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
								id='password'
								type='password'
								className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
								placeholder='Введите пароль'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<button
							type='submit'
							className='bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition-colors'
						>
							Зарегистрироваться
						</button>
					</form>
				)}

				<div className='flex items-center justify-center my-4'>
					<span className='text-sm text-gray-500'>
						Или зарегистрируйтесь через
					</span>
				</div>
			</div>
		</div>
	)
}
