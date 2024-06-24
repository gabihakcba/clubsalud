'use client'

import HasRole from 'components/HasRole'
import { Card } from 'primereact/card'
import { useState, type ReactElement, useEffect } from 'react'
import { useModal } from 'utils/useModal'
import { Account, Member, Permissions } from 'utils/types'
import { Dialog } from 'primereact/dialog'
import { ButtonGroup } from 'primereact/buttongroup'
import { Button } from 'primereact/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createAttendance, getAttendances } from 'queries/attendance'
import { getMembers } from 'queries/members'
import { getClasses } from 'queries/classes'
import { InputNumber } from 'primereact/inputnumber'
import { FloatLabel } from 'primereact/floatlabel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Divider } from 'primereact/divider'
import moment from 'moment'
import { Dropdown } from 'primereact/dropdown'
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
  }, [])

  return (
    <Card className='h-full w-full'>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <AttendanceAdmTable />
      </HasRole>
    </Card>
  )
}
