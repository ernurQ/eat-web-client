export const routes = {
	aboutUs: () => '/about-us',
	welcome: () => '/welcome',
	cart: () => '/cart',
	catalog: () => '/catalog',
	favorite: () => '/favorites',
	contacts: () => '/contacts',
	me: () => '/me',

	authLogin: () => '/auth/login',
	authReg: () => '/auth/registration',

	product: (id: string) => `/products/${id}`,
	department: (id: string) => `/departments/${id}`
}
