'use client'

import HasRole from 'components/HasRole'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { Permissions } from 'utils/types'
import AttendanceAdmTable from 'components/attendance/AttendanceAdmTable'

export default function Attendace(): ReactElement {

  return (
    <Card className='h-full w-full'>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <AttendanceAdmTable />
      </HasRole>
    </Card>
  )
}
