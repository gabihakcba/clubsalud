import { PrismaClient, AccountPermissions } from "@prisma/client"
import { NextResponse } from "next/server"
import { parse } from 'cookie';

export async function GET(req) {
  const db = new PrismaClient
  const res = await db.account.create({
    data: {
      username: "gabi",
      password: "pollo",
      permissions: "OWN"
    }
  })
  // const res = await db.account.deleteMany()
  return NextResponse.json({users:res})
}