import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '67.207.69.179',
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
					destination: 'http://67.207.69.179/api/:path*'
				}
			]
		}
		return []
	}
}

export default nextConfig
