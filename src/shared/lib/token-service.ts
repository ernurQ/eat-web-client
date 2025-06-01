const accessTokenKey = 'access-token'

function setAccessToken(token: string) {
	localStorage.setItem(accessTokenKey, token)
}

function getAccessToken() {
	return localStorage.getItem(accessTokenKey)
}

function clearAccessToken() {
	localStorage.removeItem(accessTokenKey)
}

export const tokenService = {
	setAccessToken,
	getAccessToken,
	clearAccessToken
}
