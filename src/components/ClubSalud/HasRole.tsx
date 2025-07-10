'use client'

import { type ReactElement, useEffect, useState, type ReactNode } from 'react'
import { hasPermission } from 'utils/ClubSalud/auth'
import { type Setter, type Permissions } from 'utils/ClubSalud/types'

const hasRole = async (
  required: Permissions[],
  setIsAble: Setter
): Promise<void> => {
  setIsAble(hasPermission(required))
}

interface params {
  required: Permissions[]
  children: ReactNode
}
export default function HasRole({ required, children }: params): ReactElement {
  const [isAble, setIsAble] = useState(false)
  useEffect(() => {
    void hasRole(required, setIsAble)
  })
  return <>{isAble && children}</>
}
