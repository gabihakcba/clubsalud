import { type ReactElement, useEffect, useState, type ReactNode } from 'react'
import { getUserToken, verifyToken } from 'utils/auth'
import { type Permissions } from 'utils/types'

const hasRole = async (required, setIsAble): Promise<void> => {
  const token = getUserToken()
  const user = await verifyToken(token)
  const role = user?.permissions
  setIsAble(required === role)
}

interface params {
  required: Permissions
  children: ReactNode
}
export default function HasRole({ required, children }: params): ReactElement {
  const [isAble, setIsAble] = useState(false)
  useEffect(() => {
    void hasRole(required, setIsAble)
  })
  return <>{isAble && children}</>
}
