'use client'

import HasRole from 'components/ClubSalud/HasRole'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { Permissions } from 'utils/ClubSalud/types'
import AttendanceAdmTable from 'components/ClubSalud/attendance/AttendanceAdmTable'
import AttendanceInstructorTable from 'components/ClubSalud/attendanceInstructor/AttendanceInstructorTable'

export default function Attendace(): ReactElement {
  return (
    <Card className='h-full w-full'>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <AttendanceAdmTable />
      </HasRole>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <AttendanceInstructorTable />
      </HasRole>
    </Card>
  )
}
