'use client'

import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Flex, Popconfirm, Popover } from 'antd'
import React from 'react'

import { UserRole } from '@/entities/users'

type Props = {
	userId: string
}

export function ChangeUserRoleButton({}: Props) {
	const changeUserRole = async (role: UserRole) => {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		console.log(role)
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
			{renderRoleButton('customer', 'Customer')}
			{renderRoleButton('admin', 'Admin')}
		</Flex>
	)

	return (
		<Popover
			content={content}
			title='Change Role'
			trigger='click'
		>
			<Button icon={<EllipsisOutlined />} />
		</Popover>
	)
}
