import { ShopOutlined, UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import Link from 'next/link'
import { Key, ReactNode } from 'react'

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
		<Link href={'/admin/register-branch-requests'}>Запросы компании</Link>,
		'/admin/register-branch-requests',
		<ShopOutlined />
	),
	getItem(
		<Link href={'/admin/users'}>Пользователи</Link>,
		'/admin/users',
		<UserOutlined />
	)
]
