export const routes = {
	aboutUs: () => '/about-us',
	welcome: () => '/welcome',
	cart: () => '/cart',
	catalog: () => '/catalog',
	favorite: () => '/favorites',
	contacts: () => '/contacts',
	news: () => '/news',
	me: () => '/me',

	branch: {
		profile: (id: string) => `/branch/${id}`,
		products: (id: string) => `/branch/${id}/products`,
		reviews: (id: string) => `/branch/${id}/reviews`
	},

	orders: () => '/owner/orders',
	ownerProducts: () => '/owner/products',
	ownerAccount: () => '/owner/account',

	auth: {
		loginUser: () => '/auth/login',

		registerUser: () => '/auth/registration/user',
		registerBranch: () => '/auth/registration/branch'
	},

	product: (id: string) => `/products/${id}`,
	department: (id: string) => `/departments/${id}`,

	admin: {
		registerBranchRequests: () => '/admin/register-branch-requests',
		users: () => '/admin/users',
		categories: () => '/admin/categories'
	}
}
