export const routes = {
	aboutUs: () => '/about-us',
	welcome: () => '/welcome',
	cart: () => '/cart',
	catalog: () => '/catalog',
	favorite: () => '/favorites',
	contacts: () => '/contacts',
	me: () => '/me',

	orders: () => '/owner/orders',
	companyProducts: () => '/owner/products',
	companyAccount: () => '/owner/account',

	authLogin: () => '/auth/login',
	authReg: () => '/auth/registration',

	product: (id: string) => `/products/${id}`,
	department: (id: string) => `/departments/${id}`
}
