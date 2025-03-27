import { type Notes, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/ClubSalud/prisma'

const db: PrismaClient = prisma

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('readed')
  try {
    if (!query) {
      const notifications: Notes[] = await db.notes.findMany({
        include: {
          account: true
        }
      })
      return new Response(JSONbig.stringify(notifications), {
        status: 200
      })
    } else if (query === 'false') {
      const notifications: Notes[] = await db.notes.findMany({
        where: {
          readed: false
        },
        include: {
          account: true
        }
      })
      return new Response(JSONbig.stringify(notifications), {
        status: 200
      })
    } else {
      const notifications: Notes[] = await db.notes.findMany({
        where: {
          readed: true
        },
        include: {
          account: true
        }
      })
      return new Response(JSONbig.stringify(notifications), {
        status: 200
      })
    }
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('No se encontro notas'), {
      status: 300
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const data = await req.json()
  try {
    const notes: Notes = await db.notes.create({
      data: {
        title: data.title,
        body: data.body,
        account: {
          connect: {
            id: data.accountId
          }
        }
      },
      include: {
        account: true
      }
    })

    return new Response(JSONbig.stringify(notes), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
