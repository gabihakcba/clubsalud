import {
  type PrismaClient,
  type Account,
  type AccountPermissions,
  type Member,
  MemberState
} from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import { type CreateMember, type UpdateAccount } from 'utils/types'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  const searchParams: URLSearchParams = req.nextUrl.searchParams
  const page: number = Number(searchParams.get('page'))
  // const start: number = page * APP - APP
  // const end: number = page * APP
  try {
    /**
     * page=-1 returns total pages number
     */
    if (page === -1) {
      const total: number = await db.member.count()
      return new Response(JSON.stringify({ total }), {
        status: 200
      })
    } else {
      /**
       * page=0 returns all accounts
       */
      const members: Member[] = await db.member.findMany()
      members.forEach((e) => {
        if (e.name === 'horus') {
          console.log(e)
        }
      })
      return new Response(JSON.stringify(members), {
        status: 200
      })
    }
  } catch (error) {
    return new Response(JSON.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data: CreateMember = await req.json()
    const parsed = {
      name: data.name,
      lastName: data.lastName,
      dni: Number(data.dni),
      cuit: Number(data.cuit),
      phoneNumber: Number(data.phoneNumber),
      address: data.address,
      inscriptionDate: new Date(data.inscriptionDate),
      derivedBy: data.derivedBy,
      afiliateNumber: Number(data.afiliateNumber),
      state: MemberState[data.state]
    }
    const res: Member = await db.member.create({
      data: {
        ...parsed,
        account: {
          connect: {
            id: data.accountId
          }
        }
      }
    })
    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data: { id: number } = await req.json()
    const res: Member = await db.member.delete({
      where: {
        id: data.id
      }
    })
    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response('No se pudo eliminar el usuario', {
      status: 400
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const fields: UpdateAccount = await req.json()
    console.log(fields)
    const res: Account = await db.account.update({
      where: {
        id: fields.id
      },
      data: {
        username: fields.username,
        password: fields.password,
        permissions: fields.permissions as unknown as AccountPermissions
      }
    })
    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response('No se pudo crear el usuario', {
      status: 400
    })
  }
}
