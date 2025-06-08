import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { routes } from '@/shared/config/routes'
import { tokenService } from '@/shared/lib/token-service'
import { LogoutOutlined } from '@ant-design/icons'
import { queryClient } from '@/shared/api'

export default function LogoutSection({value='Выйти с аккаунта'}) {
	const router = useRouter()
	const [isLogginOut, setIsLoggingOut] = useState(false)

	const handleLogout = () => {
		setIsLoggingOut(true)
		try {
			tokenService.clearAccessToken()
			queryClient.clear()
			router.push(routes.auth.loginUser())
		} catch (error) {
			console.log('logout failed', error)
		} finally {
			setIsLoggingOut(false)
		}
	}
	return (
		<button
			onClick={handleLogout}
			disabled={isLogginOut}
			className='block mt-4 bg-red-500 hover:bg-red-900 transition-colors duration-200 rounded-full px-3 py-2 text-white'
		>
			{isLogginOut ? (
				'Logging out...'
			) : (
				<div className='flex gap-2'>
					<LogoutOutlined />
					<span>{value}</span>
				</div>
			)}
		</button>
	)
}
