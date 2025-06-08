import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'api.eatweb.food',
				port: '',
				pathname: '/**'
			}
		]
	},
	async rewrites() {
		if (process.env.NODE_ENV === 'development') {
			return [
				{
					source: '/api/:path*',
					destination: 'http://localhost/api/:path*'
				}
			]
		}
		return []
	}
}

export default nextConfig
