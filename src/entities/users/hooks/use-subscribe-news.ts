import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { usersApi } from '@/entities/users/users-api'

export function useSubscribeNews(
	options?: UseMutationOptions<void, Error, string>
) {
	return useMutation({
		mutationFn: (email) => usersApi.subscribeNews(email),
		...options
	})
}
