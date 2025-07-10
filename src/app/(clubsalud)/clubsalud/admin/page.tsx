'use client'

import { type ReactElement, useEffect, useState } from 'react'
import { type Account, Permissions } from 'utils/ClubSalud/types'
import { getDataSessionClubSalud } from 'utils/ClubSalud/auth'
import { Card } from 'primereact/card'
import { useQuery } from '@tanstack/react-query'
import { getAccountById } from 'queries/ClubSalud/accounts'
import logo from '../../../../../public/logos/logo_large.png'
import Image from 'next/image'
import { Tag } from 'primereact/tag'
import HasRole from 'components/ClubSalud/HasRole'
import MemberPage from 'components/ClubSalud/homepage/MemberPage'
import AdminPage from 'components/ClubSalud/homepage/AdminPage'
import InstructorPage from 'components/ClubSalud/homepage/InstructorPage'

const getTypeAccount = (
  acc: Account | undefined
): { type: string; severity: string } => {
  if (acc) {
    if (acc.permissions.includes(Permissions.MEM)) {
      return { type: 'Alumna/o', severity: 'success' }
    } else if (acc.permissions.includes(Permissions.ADM)) {
      return { type: 'Empleada/o', severity: 'warning' }
    } else if (acc.permissions.includes(Permissions.INS)) {
      return { type: 'Profesor/a', severity: 'info' }
    } else if (acc.permissions.includes(Permissions.OWN)) {
      return { type: 'Propietario/a', severity: 'danger' }
    }
  }
  return { type: '', severity: 'success' }
}

const getName = (acc: Account | undefined): string => {
  if (acc) {
    if (acc.Member) return acc.Member.name
    else if (acc.Employee) return acc.Employee.name
    else if (acc.Instructor) return acc.Instructor.name
    else return acc.username
  }
  return ''
}

const setInfo = (acc: Account | undefined, setAccountInfo): void => {
  const type = getTypeAccount(acc)
  const info = {
    name: getName(acc),
    type: type.type,
    severity: type.severity
  }
  setAccountInfo(info)
}

export default function PersonalAccount(): ReactElement {
  const [user, setUser] = useState<{
    id: number
    username: string
    permissions: string[]
  }>({
    id: -1,
    username: '',
    permissions: [Permissions.OTHER]
  })
  const [accountInfo, setAccountInfo] = useState<any>(null)

  const { data: account } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      return await getAccountById(String(user.id))
    }
  })

  useEffect(() => {
    setUser(getDataSessionClubSalud().user)
  }, [])

  useEffect(() => {
    setInfo(account, setAccountInfo)
  }, [account])

  return (
    <Card
      className='h-screen overflow-scroll w-full'
      header={() => (
        <div className='flex align-items-center justify-content-center gap-8 p-2'>
          <Image
            alt='Card'
            src={logo}
            className='w-20rem h-7rem border-round-lg'
          />
        </div>
      )}
      title={() => {
        return (
          <nav className='w-full flex align-items-center justify-content-center gap-4'>
            <h2>Bienvenido/a {accountInfo?.name}</h2>
            <Tag severity={accountInfo?.severity}>{accountInfo?.type}</Tag>
          </nav>
        )
      }}
    >
      <HasRole required={[Permissions.MEM]}>
        <MemberPage account={account} />
      </HasRole>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <AdminPage />
      </HasRole>
      <HasRole required={[Permissions.INS]}>
        <InstructorPage account={account} />
      </HasRole>
    </Card>
  )
}
