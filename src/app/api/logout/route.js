import { parse } from "cookie"

export async function POST(req) {

  try {
    const cookies = parse(`${req.cookies}` || '')
    if (cookies.auth) {
      try {
  
        const response = new Response(null, {
          status: 200,
          headers: {
            'Set-Cookie': 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
          },
        })
        return response;
      } catch  {
        return new Response(JSON.stringify('No valid token'), {
          status: 401
        })
      }
    }
    else {
      return new Response(JSON.stringify('No user found'), {
        status: 401
      })
    }

  }
  catch {
    return new Response(JSON.stringify('Server error'), {
      status: 500
    })
  }
}