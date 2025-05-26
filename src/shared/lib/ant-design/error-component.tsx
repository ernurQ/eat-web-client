import { Result } from 'antd'

type Props = {
	error?: Error
}

export function ErrorComponent({ error }: Props) {
	return (
		<Result
			status='error'
			title='Ошибка загрузки данных'
			subTitle={
				error?.message ||
				'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.'
			}
		/>
	)
}
