'use client'

import { useRouter } from 'next/navigation'
import { useEffect, type ReactElement } from 'react'
import { getDataSession } from 'utils/Medintt/session'

export default function AdminPage(): ReactElement {
  const router = useRouter()
  useEffect(() => {
    const dataSession = getDataSession()
    if (!dataSession.user) {
      router.push('/medicina-laboral-empresas')
    }
  }, [router])
  return <h1>Admin</h1>
}
