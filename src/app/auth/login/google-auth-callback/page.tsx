'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { routes } from '@/shared/config/routes'
import { tokenService } from '@/shared/lib/token-service'

export default function GoogleCallbackPage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const token = searchParams.get('token')
		const role = searchParams.get('role')

		if (!token || !role) {
			router.replace(routes.auth.loginUser())
			return
		}

		tokenService.setAccessToken(token)

		if (role === 'admin') {
			router.push(routes.admin.registerBranchRequests())
			return
		}

		if (role === 'customer') {
			toast.success(`Добро пожаловать`)
			router.push(routes.catalog())
			return
		}

		if (role === 'seller') {
			toast.success(`Добро пожаловать`)
			router.push(routes.ownerAccount())
			return
		}
	}, [router, searchParams])

	return (
		<div className='flex justify-center items-center h-screen text-xl'>
			Обработка авторизации...
		</div>
	)
}
