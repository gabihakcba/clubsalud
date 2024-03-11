'use client'

import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import { useEffect, useState } from 'react'

export default function PersonalAccount() {
  const [user, setUser] = useState({
    id: '',
    username: '',
    permissions: ''
  })

  useEffect(() => {
    const token = parse(`${document.cookie}` || '')
    if (token.auth) {
      try {
        const auth = token.auth
        const data = verify(auth, 'secret')
        setUser(user => {
          return {
            ...user,
            id: data.id,
            username: data.username,
            permissions: data.permissions
          }
        })
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