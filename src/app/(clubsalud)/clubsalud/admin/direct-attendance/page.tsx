'use client'

import NewAttendanceMember from 'components/ClubSalud/attendance/NewAttendanceMember'
import NewAttendanceInstructorForm from 'components/ClubSalud/attendanceInstructor/NewAttendanceInstructorForm'
import QRInstructorAttendance from 'components/ClubSalud/QR/QRInstructorAttendance'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'

export default function DirectAttendance(): ReactElement {
  return (
    <Card className='h-screen w-screen text-center'>
      <h1>Asistencias</h1>
      <div className='flex flex-column md:flex-row justify-content-center'>
        <div className='w-full md:w-5 flex flex-column align-items-center gap-3 py-5'>
          <h2>Alumnos</h2>
          <NewAttendanceMember />
        </div>
        <div className='w-full md:w-2'>
          <Divider
            layout='vertical'
            className='hidden md:flex'
          />
          <Divider
            layout='horizontal'
            className='flex md:hidden'
            align='center'
          >
            <b>OR</b>
          </Divider>
        </div>
        <div className='w-full md:w-5 flex flex-column align-items-center gap-3 py-5'>
          <h2>Profesores</h2>
          <NewAttendanceInstructorForm />
          <Divider
            layout='horizontal'
            className='flex'
            align='center'
          >
            <b>Asistencia por QR</b>
          </Divider>
          <div className='w-max h-max p-2 bg-white'>
            <QRInstructorAttendance />
          </div>
        </div>
      </div>
    </Card>
  )
}
