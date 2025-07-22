'use client'

import { type ReactElement, type ReactNode } from 'react'
import { hasPermission } from 'utils/ClubSalud/auth'
import { type Permissions } from 'utils/ClubSalud/types'

interface params {
  required: Permissions[]
  children: ReactNode
}
export default function HasRole({ required, children }: params): ReactElement | null {
  const isAble = hasPermission(required)
  return isAble ? <>{children}</> : null
}
