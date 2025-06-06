import {
	BorderlessTableOutlined,
	LogoutOutlined,
	ShopOutlined,
	UserOutlined
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Key, ReactNode } from 'react'

import { routes } from '@/shared/config/routes'
import { tokenService } from '@/shared/lib/token-service'

type MenuItem = Required<MenuProps>['items'][number]
function getItem(
	label: ReactNode,
	key: Key,
	icon: ReactNode,
	children?: MenuItem[],
	onClick?: () => void
): MenuItem {
	return {
		label,
		key,
		icon,
		children,
		onClick
	} as MenuItem
}

export const useMenuItems = () => {
	const router = useRouter()
	
	const menuItems: MenuItem[] = [
		getItem(
			<Link href={routes.admin.registerBranchRequests()}>
				Запросы компании
			</Link>,
			routes.admin.registerBranchRequests(),
			<ShopOutlined />
		),
		getItem(
			<Link href={routes.admin.users()}>Пользователи</Link>,
			routes.admin.users(),
			<UserOutlined />
		),
		getItem(
			<Link href={routes.admin.categories()}>Категории</Link>,
			routes.admin.categories(),
			<BorderlessTableOutlined />
		),
		getItem('Выйти', 'logout', <LogoutOutlined />, undefined, () => {
			tokenService.clearAccessToken()
			router.push(routes.auth.loginUser())
		})
	]

	return menuItems
}
