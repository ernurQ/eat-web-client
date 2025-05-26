import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@ant-design/v5-patch-for-react-19'
import { PropsWithChildren } from 'react'

export function AntDesignProvider({ children }: PropsWithChildren) {
	return <AntdRegistry>{children}</AntdRegistry>
}
