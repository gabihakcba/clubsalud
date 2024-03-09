import { PrismaClient, AccounPermissions } from "@prisma/client"
import { NextResponse } from "next/server"
import { parse } from 'cookie';

export async function GET(req) {
  try {
    const cookies = parse(`${req.cookies}` || '')
    if (!cookies.auth) {
      return new Response(JSON.stringify('Invalid Token'), {
        status: 498
      })
    }
    const db = new PrismaClient
    const users = await db.account.findMany()
    console.log(users)
    return new Response(JSON.stringify(users), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify('Internal Server Error :('), {
      status: 500
    })
  }
  // const db = new PrismaClient
  // const res = await db.account.create({
  //   data: {
  //     username: 'instructor',
  //     password: 'instructor',
  //     permissions: AccounPermissions.INS
  //   }
  // })
  // const user = await db.account.findMany()
  // return NextResponse.json({ users: user })
}