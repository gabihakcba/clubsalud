import { type RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { type NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const verifyCookie = async (
  cookie: RequestCookie | undefined
): Promise<boolean> => {
  if (typeof cookie === 'undefined') return false
  try {
    const parsed: string = cookie.value
    const secret = Buffer.from('my_secret_key', 'utf-8').toString('base64')
    const payload = await jwtVerify(parsed, new TextEncoder().encode(secret))
    return payload !== null
  } catch (error) {
    return false
  }
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const loginPath: string = '/'
  const pathname: string = req.nextUrl.pathname

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fav') ||
    pathname.startsWith('/api/login')
  ) {
    return NextResponse.next()
  }

  const cookie: RequestCookie | undefined = req.cookies.get('auth')
  const verifiedCookie = await verifyCookie(cookie)

  if (!verifiedCookie && pathname !== loginPath) {
    return NextResponse.redirect(new URL('/', req.url))
  } else if (verifiedCookie && pathname === loginPath) {
    return NextResponse.redirect(new URL('/admin/accounts', req.url))
  } else if (!verifiedCookie && pathname === loginPath) {
    return NextResponse.next()
  } else if (verifiedCookie && pathname !== loginPath) {
    return NextResponse.next()
  }

  return NextResponse.next()
}
