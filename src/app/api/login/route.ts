import jwt from 'jsonwebtoken'
import { type NextRequest } from 'next/server'
import { type PrismaClient, type Account } from '@prisma/client'
import { type LogIn } from 'utils/ClubSalud/types'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function POST(req: NextRequest): Promise<Response> {
  const body: LogIn = await req.json()
  // console.log(body)

  try {
    const userMatch: Account | null = await db.account.findFirst({
      where: {
        username: body.username
      }
    })

    if (
      userMatch !== null &&
      body.username === userMatch.username &&
      body.password === userMatch.password
    ) {
      const user: Account = {
        id: userMatch.id,
        username: userMatch.username,
        password: userMatch.password,
        permissions: userMatch.permissions
      } // <-  Solo userId y userName
      const secret = Buffer.from('my_secret_key', 'utf-8').toString('base64')
      const token: string = jwt.sign(user, secret, {
        // expiresIn: Math.floor(new Date().getTime() / 1000) + daysToSeconds(),
        expiresIn: '60d'
      })

      // const serialized = serialize(`${userMatch.username}accesToken`, token, {
      //   httpOnly: true,
      //   secure: false, // true for production
      //   sameSite: none, // strict for same site in production
      //   maxAge: 1000 * daysToSeconds(60),
      //   path: '/'
      // })

      return new Response(JSONbig.stringify(token), {
        status: 200,
        headers: { 'Set-Cookie': `auth=${token}; Path=/` }
      })
    } else {
      return new Response('error', {
        status: 400
      })
    }
  } catch {
    return new Response('error', {
      status: 500
    })
  }
}
