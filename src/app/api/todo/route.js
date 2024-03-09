import { PrismaClient, AccounPermissions } from "@prisma/client"
import { NextResponse } from "next/server"
import { parse } from 'cookie';

export async function GET(req) {
  const db = new PrismaClient
  const res = await db.account.create({
    data: {
      username: 'instructor',
      password: 'instructor',
      permissions: AccounPermissions.INS
    }
  })
  const user = await db.account.findMany()
  return NextResponse.json({users:user})
  // const cookies = parse(`${req.cookies}` || '')
  // console.log(cookies)
  // return NextResponse.json(cookies)
}