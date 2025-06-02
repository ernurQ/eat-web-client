import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		if (process.env.NODE_ENV === 'development') {
			return [
				{
					source: '/backend-api/:path*',
					destination: 'http://localhost/api/:path*'
				}
			]
		}
		return []
	}
}

export default nextConfig
