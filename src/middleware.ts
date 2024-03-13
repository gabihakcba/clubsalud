import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { cookies } from 'next/headers'

const verifyCookie = async (cookie: RequestCookie): Promise<boolean> => {
  if (typeof cookie === 'undefined') return false
  try {
    const parsed: string = cookie.value
    const payload = await jwtVerify(parsed, new TextEncoder().encode('secret'))
    return true
  } catch (error) {
    return false
  }
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const adminPathReg: RegExp = /^\/admin/i
  const loginPath: string = '/'
  const pathname: string = req.nextUrl.pathname
  
  if (pathname.startsWith('/_next') || pathname.startsWith('/fav') || pathname.startsWith('/api/login')) {
    return NextResponse.next();
  }
  
  const cookie: RequestCookie = req.cookies.get('auth')
  const verifiedCookie = await verifyCookie(cookie)
  
  if (!verifiedCookie && pathname !== loginPath) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  else if (verifiedCookie && pathname === loginPath) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
  else if (!verifiedCookie && pathname === loginPath) {
    return NextResponse.next()
  }
  else if (verifiedCookie && pathname !== loginPath) {
    return NextResponse.next()
  }

  return NextResponse.next()
}