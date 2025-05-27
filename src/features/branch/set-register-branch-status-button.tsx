'use client'

import { Button, Popconfirm } from 'antd'

type Props = {
	variant: 'approve' | 'reject'
	branchId: string
}

export function SetRegisterBranchStatusButton({ variant }: Props) {
	const confirm = () =>
		new Promise((resolve) => {
			setTimeout(() => resolve(null), 3000)
		})

	if (variant === 'approve') {
		return (
			<Popconfirm
				title={'Are you sure to approve this branch?'}
				trigger={['click']}
				onConfirm={confirm}
			>
				<Button type={'primary'}>Одобрить</Button>
			</Popconfirm>
		)
	}

	return (
		<Popconfirm
			title={'Are you sure to reject this branch?'}
			trigger={['click']}
			onConfirm={confirm}
		>
			<Button danger>Отклонить</Button>
		</Popconfirm>
	)
}
