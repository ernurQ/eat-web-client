import {
	BorderlessTableOutlined,
	ShopOutlined,
	UserOutlined
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import Link from 'next/link'
import { Key, ReactNode } from 'react'

import { routes } from '@/shared/config/routes'

type MenuItem = Required<MenuProps>['items'][number]
function getItem(
	label: ReactNode,
	key: Key,
	icon: ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		label,
		key,
		icon,
		children
	} as MenuItem
}

export const menuItems: MenuItem[] = [
	getItem(
		<Link href={routes.admin.registerBranchRequests()}>Запросы компании</Link>,
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
	)
]
