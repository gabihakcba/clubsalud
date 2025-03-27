import { type Notes, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import prisma from 'utils/ClubSalud/prisma'

const db: PrismaClient = prisma

export async function PATCH(req, context): Promise<Response> {
  const id = Number(context.params.id)
  try {
    const note: Notes | null = await db.notes.findUnique({ where: { id } })
    const updatedNote: Notes = await db.notes.update({
      where: {
        id
      },
      data: {
        readed: !note?.readed
      }
    })
    return new Response(JSONbig.stringify(updatedNote), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
