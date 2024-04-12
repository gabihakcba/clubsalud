'use client'

import { useQuery } from '@tanstack/react-query'
import AccountInfo from 'components/account/AccountInfo'
import { getAccountById } from 'queries/accounts'
import { type ReactElement } from 'react'

interface params {
  params: {
    id: string
  }
}
export default function AccountPage({ params }: params): ReactElement {
  const { data: account } = useQuery({
    queryKey: ['account', params.id],
    queryFn: async () => {
      return await getAccountById(params.id)
    }
  })

  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      {account && (
        <div className='w-full p-6 flex flex-col gap-5'>
          <AccountInfo account={account}></AccountInfo>
        </div>
      )}
    </div>
  )
}
