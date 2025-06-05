import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@ant-design/v5-patch-for-react-19'
import { ConfigProvider } from 'antd'
import { PropsWithChildren } from 'react'

export function AntDesignProvider({ children }: PropsWithChildren) {
	return (
		<AntdRegistry>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: 'rgb(205, 223, 149)'
					},
					components: {
						Layout: {
							siderBg: '#f6ffed',
							headerBg: 'white'
						},
						Menu: {
							itemSelectedBg: 'rgb(205, 223, 149)',
							itemSelectedColor: 'black',
							itemBg: '#f6ffed'
						},
						Select: {
							borderRadius: 16,
							fontFamily: 'Montserrat',
							colorText: 'gray',
							margin: 5
						}
					}
				}}
			>
				{children}
			</ConfigProvider>
		</AntdRegistry>
	)
}
