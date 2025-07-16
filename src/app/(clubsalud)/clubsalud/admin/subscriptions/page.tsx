'use client'

import { useQuery } from '@tanstack/react-query'
import SubscriptionTable from 'components/ClubSalud/subscriptions/SubscriptionsTable'
import { getSubscriptions } from 'queries/ClubSalud/subscriptions'
import { type ReactElement } from 'react'

export default function SubscriptionPage(): ReactElement {
  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      return await getSubscriptions()
    }
  })

  return <SubscriptionTable subscriptions={subscriptions ?? []} />
}
