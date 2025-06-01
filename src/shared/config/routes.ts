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

	auth: {
		loginUser: () => '/auth/login',

		registerUser: () => '/auth/registration/user',
		registerBranch: () => '/auth/registration/branch'
	},

	product: (id: string) => `/products/${id}`,
	department: (id: string) => `/departments/${id}`,

	admin: {
		registerBranchRequests: () => '/admin/register-branch-requests',
		users: () => '/admin/users'
	}
}
