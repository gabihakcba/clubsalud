import {
  type PrismaClient,
  type Account,
  AccountPermissions
} from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import { type CreateAccount, type UpdateAccount } from 'utils/types'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  const searchParams: URLSearchParams = req.nextUrl.searchParams
  const page = Number(searchParams.get('page'))
  const elems = Number(searchParams.get('elems'))
  const getPages = Number(searchParams.get('getPages'))
  const filterName = searchParams.get('filterName')
  const filterPerm: string | null = searchParams.get('filterPerm')
  try {
    if (getPages > 0) {
      // # elems
      const total: number = await db.account.count()
      return new Response(JSONbig.stringify({ total }), {
        status: 200
      })
    } else if (page === 0) {
      // all elems
      const users: Account[] = await db.account.findMany({
        include: {
          memberAccount: true,
          instructorAccount: true,
          employeeAccount: true
        }
      })
      const usersFilters: Array<Omit<Account, 'password'>> = []
      users.forEach((user: Account) => {
        usersFilters.push({
          id: user.id,
          username: user.username,
          permissions: user.permissions
        })
      })
      return new Response(
        JSONbig.stringify({
          pages: users,
          totalPages: 0,
          previousPage: 0,
          currentPage: 0,
          nextPage: 0,
          perPAge: 0
        }),
        {
          status: 200
        }
      )
    } else {
      // page elems
      const users: Account[] = await db.account.findMany({
        where: {
          username: {
            contains: filterName ?? ''
          }
        }
      })
      const usersFilters: Account[] = []
      users.forEach((user: Account) => {
        usersFilters.push({
          id: user.id,
          username: user.username,
          permissions: user.permissions,
          password: user.password
        })
      })
      let fil: Account[] = []
      if (filterPerm !== null && filterPerm in AccountPermissions) {
        fil = usersFilters.filter((user) =>
          user.permissions.some((permission) => permission === filterPerm)
        )
      } else {
        fil = usersFilters
      }
      const start: number = (page - 1) * elems
      const end: number = page * elems
      const usersPage: Account[] = fil.slice(start, end)
      const total: number = fil.length
      const pages: number = Math.ceil(total / elems)
      return new Response(
        JSONbig.stringify({
          pages: usersPage,
          totalPages: pages,
          previousPage: page > 1 ? page - 1 : undefined,
          currentPage: page,
          nextPage: page < pages ? page + 1 : undefined,
          perPAge: elems
        }),
        {
          status: 200
        }
      )
    }
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data: CreateAccount = await req.json()
    const res: Account = await db.account.create({
      data,
      include: {
        notificationSender: true,
        notifiactionReceiver: true,
        instructorAccount: true,
        memberAccount: true,
        employeeAccount: true
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
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
    return new Response(JSONbig.stringify(res), {
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
    const res: Account = await db.account.update({
      where: {
        id: fields.id
      },
      data: {
        username: fields.username,
        password: fields.password,
        permissions: fields.permissions as unknown as AccountPermissions[]
      },
      include: {
        notificationSender: true,
        notifiactionReceiver: true,
        instructorAccount: true,
        memberAccount: true,
        employeeAccount: true
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response('No se pudo crear el usuario', {
      status: 400
    })
  }
}
