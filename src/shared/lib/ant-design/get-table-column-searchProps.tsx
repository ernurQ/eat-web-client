import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, TableColumnType } from 'antd'
import { useRef } from 'react'

export function useGetTableColumnSearchProps<DataType>() {
	const searchInput = useRef<InputRef>(null)

	return (
		dataIndex: keyof DataType,
		value: string,
		handleSearch: (key: string, value: string) => void,
		handleReset: (key: string) => void
	): TableColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			close,
			clearFilters
		}) => (
			<div
				style={{ padding: 8 }}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={'Поиск'}
					value={(selectedKeys[0] as string) ?? value ?? ''}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(dataIndex.toString(), selectedKeys[0] as string)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() =>
							handleSearch(dataIndex.toString(), selectedKeys[0] as string)
						}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90 }}
					>
						Поиск
					</Button>
					<Button
						onClick={() => {
							handleReset(dataIndex.toString())
							if (clearFilters) {
								clearFilters()
							}
						}}
						size='small'
						style={{ width: 90 }}
					>
						Сброс
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close()
						}}
					>
						закрыть
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100)
				}
			}
		}
	})
}
