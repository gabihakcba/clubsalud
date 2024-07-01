'use client'

import { type ReactElement, useEffect, useState } from 'react'
import { type Account, Permissions } from 'utils/types'
import { getUserToken, setNewUser } from 'utils/auth'
import { Card } from 'primereact/card'
import { useQuery } from '@tanstack/react-query'
import { getAccountById } from 'queries/accounts'
import logo from '../../../public/logos/logo_large.png'
import Image from 'next/image'
import { Tag } from 'primereact/tag'
import HasRole from 'components/HasRole'
import MemberPage from 'components/homepage/MemberPage'
import AdminPage from 'components/homepage/AdminPage'
import InstructorPage from 'components/homepage/InstructorPage'

const getTypeAccount = (
  acc: Account | undefined
): { type: string; severity: string } => {
  if (acc) {
    if (acc.memberAccount) {
      return { type: 'Alumna/o', severity: 'success' }
    } else if (acc.employeeAccount) {
      return { type: 'Empleada/o', severity: 'warning' }
    } else if (acc.instructorAccount) {
      return { type: 'Profesor/a', severity: 'info' }
    }
  }
  return { type: 'Propietario/a', severity: 'danger' }
}

const getName = (acc: Account | undefined): string => {
  if (acc) {
    if (acc.memberAccount) return acc.memberAccount.name
    else if (acc.employeeAccount) return acc.employeeAccount.name
    else if (acc.instructorAccount) return acc.instructorAccount.name
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
  const [user, setUser] = useState<Account>({
    id: -1,
    username: '',
    password: '',
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
    const token = getUserToken()
    void setNewUser(token, setUser)
  }, [])

  useEffect(() => {
    setInfo(account, setAccountInfo)
  }, [account])

  return (
    <Card
      className='h-full w-full'
      header={() => (
        <div className='flex align-items-center justify-content-center gap-8 p-2'>
          <Image
            alt='Card'
            src={logo}
            className='w-20rem h-7rem'
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
      {/* <div className='border-2'>Nav</div>
      <div>Bienvenido {account !== undefined ? getName(account) : ''}</div>
      <p>
        {user.username} {user.id}
      </p>
      <div>
        {user.permissions.map((permission, index) => (
          <p key={index}>{permission}</p>
        ))}
      </div> */}
    </Card>
  )
}
