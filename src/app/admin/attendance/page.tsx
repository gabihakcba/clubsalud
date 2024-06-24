'use client'

import HasRole from 'components/HasRole'
import { Card } from 'primereact/card'
import { useState, type ReactElement, useEffect } from 'react'
import { type Account, Permissions } from 'utils/types'
import { useQuery } from '@tanstack/react-query'
import { getClasses } from 'queries/classes'
import AttendanceAdmTable from 'components/attendance/AttendanceAdmTable'

export default function Attendace(): ReactElement {
  const [user, setUser] = useState<Account | null>(null)

  const { data: classes } = useQuery({
    queryKey: ['class'],
    queryFn: async () => {
      return await getClasses()
    }
  })

  useEffect(() => {
    const storage = localStorage.getItem('user')
    if (storage) {
      const user: Account = JSON.parse(storage)
      setUser(user)
    }
    console.log(user)
    console.log(classes)
  }, [])

  return (
    <Card className='h-full w-full'>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <AttendanceAdmTable />
      </HasRole>
    </Card>
  )
}
