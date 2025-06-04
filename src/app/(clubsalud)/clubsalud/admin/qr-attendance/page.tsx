'use client'

import NewAttendanceInstructorForm from 'components/ClubSalud/attendanceInstructor/NewAttendanceInstructorForm'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'

export default function QRAttendance(): ReactElement {
  return (
    <Card className='h-screen'>
      <div className='flex justify-content-center align-items-center'>
        <NewAttendanceInstructorForm/>
      </div>
    </Card>
  )
}
