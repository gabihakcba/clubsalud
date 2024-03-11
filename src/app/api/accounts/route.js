import { PrismaClient, AccounPermissions } from "@prisma/client"
import { parse } from 'cookie';
import { APP } from '@/utils/const'

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const page = Number(searchParams.get('page'))
  const start = page*APP - APP
  const end = page*APP
  try {
    const cookies = parse(`${req.cookies}` || '')
    if (!cookies.auth) {
      return new Response(JSON.stringify('Invalid Token'), {
        status: 498
      })
    }
    const db = new PrismaClient

    /**
     * page=-1 returns total pages number
     */
    if(page === -1){
      const total = await db.account.count()
      return new Response(JSON.stringify({total:total}), {
        status: 200
      })
    }
     /**
     * page=0 returns all accounts
     */
    else if(page === 0) {
      const users = await db.account.findMany()
      let usersFilters = []
      users.map(user => {
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
    }
    else {
      const users = await db.account.findMany()
      let usersFilters = []
      users.map(user => {
        usersFilters.push({
          id: user.id,
          username: user.username,
          permissions: user.permissions,
          password: user.password
        })
      })
      const usersPage = usersFilters.slice(start, end)
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

export async function POST(req) {
  try {
    const db = new PrismaClient
    const data = await req.json()
    const res = await db.account.create({
      data: {
        ...data
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

export async function DELETE(req) {
  try {
    const db = new PrismaClient
    const data = await req.json()
    const res = await db.account.delete({
      where: {
        id: Number(data.id)
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

export async function PATCH(req) {
  try {
    const db = new PrismaClient
    const fields = await req.json()
    const res = await db.account.update({
      where: {
        id: Number(fields.id)
      },
      data: {
        ...fields
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