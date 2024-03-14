import {
  type PrismaClient,
  type Account,
  type AccountPermissions
} from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import { APP } from 'utils/const'
import { type CreateAccount, type UpdateAccount } from 'utils/types'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  const searchParams: URLSearchParams = req.nextUrl.searchParams
  const page: number = Number(searchParams.get('page'))
  const start: number = page * APP - APP
  const end: number = page * APP
  try {
    /**
     * page=-1 returns total pages number
     */
    if (page === -1) {
      const total: number = await db.account.count()
      return new Response(JSON.stringify({ total }), {
        status: 200
      })
    } else if (page === 0) {
      /**
       * page=0 returns all accounts
       */
      const users: Account[] = await db.account.findMany()
      const usersFilters: Account[] = []
      users.forEach((user) => {
        usersFilters.push({
          id: user.id,
          username: user.username,
          permissions: user.permissions,
          password: user.password
        })
      })
      return new Response(JSON.stringify(usersFilters), {
        status: 200
      })
    } else {
      const users: Account[] = await db.account.findMany()
      const usersFilters: Account[] = []
      users.forEach((user: Account) => {
        usersFilters.push({
          id: user.id,
          username: user.username,
          permissions: user.permissions,
          password: user.password
        })
      })
      const usersPage: Account[] = usersFilters.slice(start, end)
      return new Response(JSON.stringify(usersPage), {
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
    const data: CreateAccount = await req.json()
    const res: Account = await db.account.create({
      data
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

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data: { id: number } = await req.json()
    const res: Account = await db.account.delete({
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
