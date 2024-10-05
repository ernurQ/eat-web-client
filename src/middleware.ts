import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const {
		nextUrl: { pathname }
	} = request

	if (pathname === '/') {
		return NextResponse.redirect(new URL('/welcome', request.url))
	}

	if (pathname.match(/^\/companies\/([^/]+)$/)) {
		return NextResponse.redirect(new URL(`${pathname}/about-us`, request.url))
	}

	if (pathname === '/profile') {
		return NextResponse.redirect(new URL('/profile/purchased', request.url))
	}
}

export const config = {
	matcher: ['/', '/companies/:id*', '/profile']
}
