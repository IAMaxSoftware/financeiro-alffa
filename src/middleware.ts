import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
    const token = 'eaofjoapdjfp'//request.cookies.get('next-auth.session-token')
    const pathname = request.nextUrl.pathname
    console.log(`path = ${pathname} | token ${token}`)
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL(getUrl('/app')))
    }

    if (pathname === '/auth' && token) {
        return NextResponse.redirect(new URL(getUrl('/app')))
    }

    if (pathname.includes('/app') && !token) {
        return NextResponse.redirect(new URL(getUrl('/auth')))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}