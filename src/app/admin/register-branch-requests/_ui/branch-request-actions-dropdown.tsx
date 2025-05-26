'use client'

import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Flex, Popover } from 'antd'

import { SetRegisterBranchStatusButton } from '@/features/branch/set-register-branch-status-button'

type Props = {
	branchId: string
}

export function BranchRequestActionsDropdown({ branchId }: Props) {
	const content = (
		<Flex
			vertical
			gap={10}
		>
			<SetRegisterBranchStatusButton
				variant={'approve'}
				branchId={branchId}
			/>
			<SetRegisterBranchStatusButton
				variant={'reject'}
				branchId={branchId}
			/>
		</Flex>
	)

	return (
		<Popover
			trigger={['click']}
			placement={'top'}
			content={content}
		>
			<Button icon={<EllipsisOutlined />} />
		</Popover>
	)
}
