'use client'

import { type ReactElement, useEffect, useState } from 'react'
import { type Account, type Setter, Permissions } from 'utils/types'
import { getUserToken, setNewUser, verifyToken } from 'utils/auth'

export default function PersonalAccount(): ReactElement {
  const [user, setUser] = useState<Account>({
    id: -1,
    username: '',
    password: '',
    permissions: Permissions.OTHER
  })

  useEffect(() => {
    setNewUser(getUserToken(), setUser)
  }, [])

  return (
    <div className='h-full w-full flex items-center justify-center flex-col'>
      <p>{user.username}</p>
      <p>{user.permissions}</p>
    </div>
  )
}
