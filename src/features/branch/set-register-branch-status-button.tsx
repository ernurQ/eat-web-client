'use client'

import { Button, Popconfirm } from 'antd'

import {
	invalidateRegisterBranchRequestsQuery,
	rejectBranchRequest
} from '@/entities/branch'
import { approveBranchRequest } from '@/entities/branch/approve-branch-requests'

type Props = {
	variant: 'approve' | 'reject'
	branchId: string
}

export function SetRegisterBranchStatusButton({ variant, branchId }: Props) {
	async function confirm() {
		if (variant === 'approve') {
			await approveBranchRequest({ id: branchId })
			await invalidateRegisterBranchRequestsQuery()
		}

		if (variant === 'reject') {
			await rejectBranchRequest({ id: branchId })
			await invalidateRegisterBranchRequestsQuery()
		}
	}

	if (variant === 'approve') {
		return (
			<Popconfirm
				title={'Вы уверены, что одобрите эту компанию?'}
				trigger={['click']}
				onConfirm={confirm}
			>
				<Button type={'primary'}>Одобрить</Button>
			</Popconfirm>
		)
	}

	return (
		<Popconfirm
			title={'Вы уверены, что откажете от этой компании?'}
			trigger={['click']}
			onConfirm={confirm}
		>
			<Button danger>Отклонить</Button>
		</Popconfirm>
	)
}
