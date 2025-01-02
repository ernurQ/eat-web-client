'use client'

import { useForm } from 'react-hook-form'

import { cn } from '@/shared/lib/classnames'

import { useSubscribeNews } from '@/entities/users'

type Input = {
	email: string
}

type Props = {
	className?: string
}

export function SubscribeNewsForm({ className }: Props) {
	const { register, handleSubmit } = useForm<Input>()

	const { mutate, isPending } = useSubscribeNews()

	const onSubmit = async ({ email }: Input) => {
		if (!email) return
		if (isPending) return
		const { toast } = await import('react-hot-toast')
		const loadingId = toast.loading('subscribing')
		mutate(email, {
			onSettled: () => {
				toast.dismiss(loadingId)
			},
			onSuccess: () => {
				toast.success('registered successfully')
			},
			onError: () => {
				toast.error('something went wrong. Try again later')
			}
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={className}
		>
			<label className={'sr-only'}>enter email</label>
			<input
				{...register('email')}
				className={cn(
					'border border-black block rounded-2xl bg-transparent',
					'px-3 h-8 w-full text-sm'
				)}
				type={'email'}
				placeholder={'E-mail'}
			/>
			<button className={'sr-only'} />
		</form>
	)
}
