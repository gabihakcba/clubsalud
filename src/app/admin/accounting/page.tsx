'use client'

import { useQuery } from '@tanstack/react-query'
import SubscriptionSection from 'components/subscriptions/SubscriptionSection'
import { getSubscriptions } from 'queries/subscriptions'
import { ReactElement } from 'react'

export default function Accounting(): ReactElement {
  const { data } = useQuery({
    queryKey: ['subs'],
    queryFn: async () => {
      const response = await getSubscriptions()
      return response
    }
  })
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full h-max'>
        <h2>Suscripciones</h2>
        <SubscriptionSection members={data}></SubscriptionSection>
      </div>
    </div>
  )
}
