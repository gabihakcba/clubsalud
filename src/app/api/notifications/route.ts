import { type Notification, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/prisma'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const notifications: Notification[] = await db.notification.findMany({
      include: {
        sender: true,
        receiver: true
      }
    })
    return new Response(JSONbig.stringify(notifications), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const data = await req.json()

  const newNotification = {
    subject: data.subject,
    body: data.body
  }

  try {
    const notification: Notification = await db.notification.create({
      data: {
        ...newNotification,
        sender: {
          connect: {
            id: Number(data.senderId)
          }
        },
        receiver: {
          connect: {
            id: Number(data.receiverId)
          }
        }
      },
      include: {
        sender: true,
        receiver: true
      }
    })

    return new Response(JSONbig.stringify(notification), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
