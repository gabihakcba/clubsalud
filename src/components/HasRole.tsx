import { ReactElement, useEffect, useState } from 'react'
import { getUserToken, verifyToken } from 'utils/auth'
import { Permissions } from 'utils/types'

const hasRole = async (required, setIsAble) => {
  const token = getUserToken()
  const user = await verifyToken(token)
  const role = user?.permissions
  setIsAble(required === role)
}

export default function HasRole({ required, children }): ReactElement {
  const [isAble, setIsAble] = useState(false)
  useEffect(() => {
    hasRole(required, setIsAble)
  })
  return <>{isAble && children}</>
}
