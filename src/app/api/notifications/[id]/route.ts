import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(req: NextRequest, context: any): Promise<Response> {
  const id: number = Number(context.params.id)

  try {
    const notifications = await db.notification.findMany({
      where: {
        OR: [{ receiverId: id }, { senderId: id }]
      },
      include: {
        sender: true,
        receiver: true
      }
    })
    return new Response(JSONbig.stringify(notifications), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
