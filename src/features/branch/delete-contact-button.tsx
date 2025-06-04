import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

import {
	deleteContact,
	invalidateSellerBranchInfoQuery
} from '@/entities/branch'

type Props = {
	contactId: string
}

export function DeleteContactButton({ contactId }: Props) {
	async function onDeleteContact() {
		await deleteContact({ contactId })
		await invalidateSellerBranchInfoQuery()
	}

	return (
		<Popconfirm
			onConfirm={onDeleteContact}
			title={'Вы уверены что хотите удалить этот контакт?'}
		>
			<Button
				htmlType={'button'}
				style={{ height: 42, width: 42 }}
			>
				<MinusCircleOutlined />
			</Button>
		</Popconfirm>
	)
}
