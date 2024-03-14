import { Account, AccountPermissions, PrismaClient } from "@prisma/client"
import { NextApiRequest } from "next"
import prisma from "utils/prisma"

const db: PrismaClient = prisma

export async function GET(req: NextApiRequest, context: any): Promise<Response> {
  const un: string = context.params.un

  try {
    const acc: {id: number} = await db.account.findFirst({
      select: {
        id: true
      },
      where: {
        username: un
      }
    })
    return new Response(JSON.stringify(acc), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}