'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoTrashBinSharp } from 'react-icons/io5'

import { registerBranchOptions } from '@/entities/auth'

type RegisterBranchInputs = {
	name: string
	bin: string
	phoneNumber: string
	branchName: string
	email: string
	password: string
	city: string
	location: string
	documentsList?: FileList
}

export default function RegisterBranchPage() {
	const {
		register,
		handleSubmit,
		watch,
		resetField,
		formState: { errors }
	} = useForm<RegisterBranchInputs>()

	const { mutate: registerBranch } = useMutation({
		...registerBranchOptions(),
		onMutate: () => {
			toast.loading('Регистрация компании', { id: 'register-branch-loading' })
		},
		onSettled: () => {
			toast.dismiss('register-branch-loading')
		},
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: () => {
			toast.success('Успешно отправлен запрос')
		}
	})

	async function onRegisterBranch({
		documentsList,
		city,
		branchName,
		location,
		...data
	}: RegisterBranchInputs) {
		const file = documentsList?.item(0)
		if (!file) return

		const input = `${city}, ${branchName}, ${location}`

		const resp = await fetch('/api/place', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ input })
		})
		const placeJson = await resp.json()

		if (placeJson.status !== 'OK' || !placeJson.candidates?.length) {
			toast.error('Не удалось найти заведение — проверьте адрес')
			return
		}

		const candidate = placeJson.candidates[0]
		const { lat, lng } = candidate.geometry.location as {
			lat: number
			lng: number
		}

		registerBranch({
			...data,
			document: file,
			city,
			branchName,
			location,
			latitude: lat.toString(),
			longitude: lng.toString()
		})
	}

	const documentFile = watch('documentsList')?.item(0)
	function removeDocument() {
		resetField('documentsList')
	}
	function validateDocument(fileList?: FileList) {
		if (!fileList || fileList.length === 0) {
			return 'Пожалуйста, выберите PDF-файл'
		}

		const file = fileList[0]

		if (file.type !== 'application/pdf') {
			return 'Разрешены только PDF-файлы'
		}

		const maxSize = 10 * 1024 * 1024
		if (file.size > maxSize) {
			return 'Размер файла должен быть не более 10 МБ'
		}

		return true
	}

	return (
		<form
			onSubmit={handleSubmit(onRegisterBranch)}
			className='flex flex-col gap-4'
		>
			<div className={'mt-5'}>
				<input
					{...register('branchName', { required: true })}
					type='text'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Название компании'
				/>
			</div>

			<div>
				<input
					{...register('city', { required: true })}
					type='text'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Город'
				/>
			</div>

			<div>
				<input
					{...register('location', { required: true })}
					type='text'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Адресс компании'
				/>
			</div>

			<div>
				<input
					{...register('bin', { required: true })}
					type='text'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='БИН'
				/>
			</div>

			<div>
				<input
					{...register('name', { required: true })}
					type='text'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Имя сотрудника'
				/>
			</div>

			<div>
				<input
					{...register('phoneNumber', { required: true })}
					type='tel'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Номер телефона'
				/>
			</div>

			<div>
				<input
					{...register('email', { required: true })}
					type='email'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Эл. почта'
				/>
			</div>

			<div>
				<input
					{...register('password', { required: true })}
					type='password'
					className='border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600'
					placeholder='Пароль'
				/>
			</div>

			<div>
				<label
					htmlFor='file'
					className='flex justify-center items-center border py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100 transition'
				>
					Загрузить документ
				</label>
				<input
					{...register('documentsList', { validate: validateDocument })}
					accept='.pdf'
					id='file'
					type='file'
					className='hidden'
				/>
				{errors.documentsList && (
					<p className='text-red-500 text-sm mt-1'>
						{errors.documentsList.message}
					</p>
				)}
			</div>

			{documentFile && (
				<div className='flex gap-4 items-center'>
					<p className='font-medium'>{documentFile.name}</p>
					<button
						type='button'
						onClick={removeDocument}
						className='text-red-500 hover:text-red-700 transition'
						title='Удалить файл'
					>
						<IoTrashBinSharp />
					</button>
				</div>
			)}

			<button
				type='submit'
				className='mt-5 bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition-colors'
			>
				Зарегистрироваться
			</button>
		</form>
	)
}
