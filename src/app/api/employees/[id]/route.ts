import { type Employee, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import prisma from 'utils/ClubSalud/prisma'

const db: PrismaClient = prisma

export async function GET(req, context): Promise<Response> {
  const id = Number(context.params.id)
  try {
    const employee: Employee | null = await db.employee.findUnique({
      where: {
        accountId: Number(id)
      }
    })
    return new Response(JSONbig.stringify(employee), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
