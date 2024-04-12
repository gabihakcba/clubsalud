'use client'

import { useQuery } from '@tanstack/react-query'
import AccountInfo from 'components/account/AccountInfo'
import Link from 'next/link'
import { getAccountById } from 'queries/accounts'
import { type ReactElement } from 'react'

interface params {
  children: ReactElement
  params: {
    id: string
  }
}
export default function AccountLayout({
  children,
  params
}: params): ReactElement {
  const { data } = useQuery({
    queryKey: ['account', params.id],
    queryFn: async () => {
      const response = await getAccountById(params.id)
      console.log(response)
      return response
    }
  })

  return (
    <div className='flex h-full w-full bb'>
      <div className='border p-4'>
        <Link href={`admin/info/${params.id}`}>Información</Link>
        <hr className='m-2' />
        <AccountInfo account={data}></AccountInfo>
      </div>
      <div className='grow border p-4'>{children}</div>
    </div>
  )
}
