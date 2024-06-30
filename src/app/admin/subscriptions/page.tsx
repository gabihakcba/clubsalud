'use client'

import { useQuery } from '@tanstack/react-query'
import MemberSubsTable from 'components/subscriptions/MemberSubsTable'
import { Card } from 'primereact/card'
import { getMembers } from 'queries/members'
import { type ReactElement } from 'react'

export default function SubscriptionPage(): ReactElement {
  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const members = await getMembers()
      return members.filter((member) => {
        return (
          member.memberSubscription !== undefined &&
          member.memberSubscription.length > 0
        )
      })
    }
  })

  return (
    <Card className='h-full'>
      <h2>Suscripciones</h2>
      <MemberSubsTable members={members} />
    </Card>
  )
}
