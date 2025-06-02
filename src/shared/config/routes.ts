export const routes = {
	aboutUs: () => '/about-us',
	welcome: () => '/welcome',
	cart: () => '/cart',
	catalog: () => '/catalog',
	favorite: () => '/favorites',
	contacts: () => '/contacts',
	news: () => '/news',
	me: () => '/me',
	companyProfile: (id: string) => `/company/${id}`,
	companyProducts: (id: string) => `/company/${id}/products`,
	companyReviews: (id: string) => `/company/${id}/reviews`,
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
		users: () => '/admin/users'
	}
}
