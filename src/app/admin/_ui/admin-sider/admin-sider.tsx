'use client'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'

import { menuItems } from '@/app/admin/_ui/admin-sider/menu-items'

const { Sider, Content, Header } = Layout

export function AdminSider({ children }: PropsWithChildren) {
	const [collapsed, setCollapsed] = useState(false)
	const currentKey = usePathname()

	return (
		<Layout
			style={{ minHeight: '100vh' }}
			className={'ant-layout-has-sider'}
		>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				style={{ paddingTop: 20 }}
			>
				<Menu
					theme='dark'
					selectedKeys={[currentKey]}
					mode='inline'
					items={menuItems}
				/>
			</Sider>

			<Layout>
				<Header style={{ padding: 0, background: 'white' }}>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64
						}}
					/>
				</Header>

				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: 'white',
						borderRadius: 10
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}
