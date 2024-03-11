import jwt  from "jsonwebtoken"
import { serialize } from 'cookie'

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const DAYS = 60;

const daysToSeconds = (days) => days * 24 * 60 * 60;

export async function POST(req) {
  const body = await req.json()
  const db = new PrismaClient()

  try {
    const userMatch = await db.account.findFirst({
      where: {
        username: body.username
      }
    })

    if(userMatch !== null && body.username === userMatch.username && body.password === userMatch.password) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + daysToSeconds(DAYS),
        id: userMatch.id,
        username: userMatch.username,
        password: userMatch.password,
        permissions: userMatch.permissions
      }, 'secret')

      
      // const serialized = serialize(`${userMatch.username}accesToken`, token, {
      //   httpOnly: true,
      //   secure: false, // true for production
      //   sameSite: none, // strict for same site in production
      //   maxAge: 1000 * daysToSeconds(60),
      //   path: '/'
      // })
      
      const response = new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Set-Cookie': `auth=${token}; Path=/`},
      })
      return response
    }
    else {
      return NextResponse.json({code:1})
    }
  }
  catch {
    return NextResponse.json({code:-1})
  }
}