export const routes = {
	loginUser: () => '/auth/user/login',
	registerUser: () => '/auth/user/register',

	welcome: () => '/welcome',
	aboutUs: () => '/about-us',
	catalog: () => '/catalog',

	favorites: () => '/favorites',
	cart: () => '/cart',

	profileMe: () => '/profile/me',
	profilePurchasedProducts: () => '/profile/purchased',
	profilePaymentMethods: () => '/profile/payment-methods',
	profileNewPaymentMethod: () => '/profile/payment-methods/new',

	company: (id: string) => `/companies/${id}/about-us`,
	companyProducts: (id: string) => `/companies/${id}/products`,
	companyReviews: (id: string) => `/companies/${id}/reviews`
}
