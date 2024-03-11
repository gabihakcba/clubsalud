import { parse } from "cookie"

export async function POST(req) {
  try {
    const cookies = parse(`${req.cookies}` || '')
    if (cookies.auth) {
      const response = new Response(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
        },
      })
      return response;

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