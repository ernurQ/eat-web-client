export interface IUserLogin {
	email: string
	password: string
}

export interface IUserLoginResponse {
	token: string
}

export interface IUserRegister {
	name: string
	surname: string
	email: string
	password: string
}
