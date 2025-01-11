'use client'

import { useQuery } from '@tanstack/react-query'
import AttendanceInstructorForm from 'components/ClubSalud/attendanceInstructor/AttendanceInstructorForm'
import { Card } from 'primereact/card'
import { getAccountById } from 'queries/ClubSalud/accounts'
import { useEffect, useState, type ReactElement } from 'react'
import { getUserToken, setNewUser } from 'utils/ClubSalud/auth'
import { type Account } from 'utils/ClubSalud/types'

export default function QRAttendance(): ReactElement {
  const [user, setUser] = useState<Account | null>(null)

  const { data: instructor } = useQuery({
    queryKey: ['instructor'],
    queryFn: async () => {
      const account = await getAccountById(`${user?.id}`)
      return account.instructorAccount
    },
    enabled: user !== null
  })

  useEffect(() => {
    const token = getUserToken()
    void setNewUser(token, setUser)
  }, [])

  return (
    <Card className='h-screen'>
      <div className='flex justify-content-center align-items-center'>
        <AttendanceInstructorForm instructor={instructor} />
      </div>
    </Card>
  )
}
