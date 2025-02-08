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
  const pathname: string = req.nextUrl.pathname

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fav') ||
    pathname.startsWith('/api/login') ||
    pathname.endsWith('/') ||
    pathname.endsWith('/clubsalud') ||
    pathname.endsWith('/clubsalud-info')
  ) {
    return NextResponse.next()
  }

  const cookie: RequestCookie | undefined = req.cookies.get('auth')
  const verifiedCookie = await verifyCookie(cookie)

  if (pathname.startsWith('/clubsalud/admin') && !verifiedCookie) {
    return NextResponse.redirect(new URL('/clubsalud', req.url))
  }

  if (pathname.startsWith('/api') && !verifiedCookie) {
    return NextResponse.redirect(new URL('/clubsalud', req.url))
  }

  if (pathname.endsWith('/clubsalud') && verifiedCookie) {
    return NextResponse.redirect(new URL('/clubsalud/admin', req.url))
  }

  return NextResponse.next()
}
