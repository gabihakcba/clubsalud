'use client'

import { useQuery } from '@tanstack/react-query'
import AccountInfo from 'components/ClubSalud/account/AccountInfo'
import { Card } from 'primereact/card'
import { ScrollPanel } from 'primereact/scrollpanel'
import { getAccountById } from 'queries/ClubSalud/accounts'
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
    <ScrollPanel
      style={{ height: '100dvh' }}
      className='p-0 m-0'
    >
      <Card className='min-h-full w-full'>
        {account && <>
          <AccountInfo account={account}></AccountInfo>
        </>}
      </Card>
    </ScrollPanel>
  )
}
