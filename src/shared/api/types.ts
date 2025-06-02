import { AxiosError } from 'axios'

export type ApiError = AxiosError<{
	status: number
	message: string
}>
