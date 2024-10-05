const accessTokenKey = 'token'

export function saveAccessToken(token: string) {
	localStorage.setItem(accessTokenKey, token)
}

export function getAccessToken() {
	return localStorage.getItem(accessTokenKey)
}
