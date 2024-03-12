import { parse } from "cookie"
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const cookies: Record<string, string> = parse(`${req.cookies}` || '')
    if (cookies.auth) {
      return new Response(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
        },
      })
    }
    else {
      return new Response(JSON.stringify('No user found'), {
        status: 498
      })
    }
  }
  catch {
    return new Response(JSON.stringify('Server Error'), {
      status: 500
    })
  }
}