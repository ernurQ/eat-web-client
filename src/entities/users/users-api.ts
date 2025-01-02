import { sleep } from '@/shared/lib/sleep'

export const usersApi = {
	subscribeNews: async (email: string) => {
		await sleep(2000)
		console.log(email)
	}
}
