'use client'

import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Flex, Popconfirm, Popover } from 'antd'
import React from 'react'

import {
	UserRole,
	downgradeUserToCustomer,
	invalidateUsersQuery,
	upgradeUserToAdmin
} from '@/entities/users'

type Props = {
	userId: string
	currentRole: 'customer' | 'admin'
}

export function ChangeUserRoleButton({ userId, currentRole }: Props) {
	const changeUserRole = async (role: UserRole) => {
		if (role === 'admin') {
			await upgradeUserToAdmin({ id: userId })
			await invalidateUsersQuery()
		}
		if (role === 'customer') {
			await downgradeUserToCustomer({ id: userId })
			await invalidateUsersQuery()
		}
	}

	const renderRoleButton = (role: UserRole, label: string) => (
		<Popconfirm
			title={`Change role to "${label}"?`}
			onConfirm={() => changeUserRole(role)}
		>
			<Button
				size='small'
				block
			>
				{label}
			</Button>
		</Popconfirm>
	)

	const content = (
		<Flex
			vertical
			gap={10}
		>
			{currentRole === 'admin' && renderRoleButton('customer', 'Пользователь')}
			{currentRole === 'customer' && renderRoleButton('admin', 'Админ')}
		</Flex>
	)

	return (
		<Popover
			content={content}
			title='Изменить роль'
			trigger='click'
		>
			<Button icon={<EllipsisOutlined />} />
		</Popover>
	)
}
