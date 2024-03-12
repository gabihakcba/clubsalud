'use client'

import { JwtPayload, verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import { useEffect, useState } from 'react'
import { Account } from 'utils/types'
import { Permissions } from 'utils/types'

export default function PersonalAccount() {
  const [user, setUser] = useState <Account>({
    id: -1,
    username: '',
    password: '',
    permissions: Permissions.OTHER
  })

  useEffect(() => {
    const token: Record<string, string> = parse(`${document.cookie}` || '')
    if (token.auth) {
      try {
        const auth: string = token.auth
        const payload: JwtPayload | string = verify(auth, 'secret')
        if(typeof payload === 'object') {
          const account: Account = {
            id: payload.id,
            username: payload.username,
            password: payload.password,
            permissions: payload.permissions
          }
          setUser(account)
        }
        else {
          console.log('Client: Payload is not and object or account')
        }
      } catch (error) {
        console.log('Client: Token expired')
      }
    }
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <p>{user.username}</p>
      <p>{user.permissions}</p>
    </div>
  )
}