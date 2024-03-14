'use client'

import { parse } from 'cookie'
import { useEffect, useState } from 'react'
import { Account } from 'utils/types'
import { Permissions } from 'utils/types'
import { JWTPayload, JWTVerifyResult, jwtVerify } from 'jose'

const veryToken = async (token: Record<string, string>, setUser: Function): Promise<JWTPayload> => {
  try {
    const secret = Buffer.from('my_secret_key', 'utf-8').toString('base64')
    const response: JWTVerifyResult<JWTPayload> = await jwtVerify(token.auth, new TextEncoder().encode(secret))
    const payload = response.payload
    const account: Account = {
      id: payload.id as number,
      username: payload.username as string,
      password: payload.password as string,
      permissions: payload.permissions as Permissions
    }
    setUser(account)
  } catch (error) {
    console.log(error)
    return {}
  }
}

export default function PersonalAccount() {
  const [user, setUser] = useState<Account>({
    id: -1,
    username: '',
    password: '',
    permissions: Permissions.OTHER
  })

  useEffect(() => {
    const token: Record<string, string> = parse(`${document.cookie}` || '')
    veryToken(token, setUser)
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <p>{user.username}</p>
      <p>{user.permissions}</p>
    </div>
  )
}