'use client'

import { type NextRequest, NextResponse } from 'next/server'
// import { hasValidClubSaludToken } from 'utils/ClubSalud/auth'

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const pathname: string = req.nextUrl.pathname

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fav') ||
    pathname.startsWith('/api/login') ||
    pathname.endsWith('/') ||
    pathname.endsWith('/clubsalud') ||
    pathname.endsWith('/clubsalud-info')
  ) {
    const res = NextResponse.next()
    res.headers.append('Access-Control-Allow-Credentials', 'true')
    res.headers.append('Access-Control-Allow-Origin', '*')
    res.headers.append(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT'
    )
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return res
  }

  // const isValidtoken = hasValidClubSaludToken('middleware')

  // if (pathname.startsWith('/clubsalud/admin') && !isValidtoken) {
  //   return NextResponse.redirect(new URL('/clubsalud', req.url))
  // }

  // if (pathname.startsWith('/api') && !isValidtoken) {
  //   return NextResponse.redirect(new URL('/clubsalud', req.url))
  // }

  // if (pathname.endsWith('/clubsalud') && isValidtoken) {
  //   console.log('Redirecting to admin page')
  //   return NextResponse.redirect(new URL('/clubsalud/admin', req.url))
  // }

  return NextResponse.next()
}
