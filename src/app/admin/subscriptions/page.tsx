'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import MemberSubsTable from 'components/subscriptions/MemberSubsTable'
import SubscriptionTable from 'components/subscriptions/SubscriptionsTable'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { getMembers } from 'queries/members'
import { deleteSubscription, updateSubscription } from 'queries/subscriptions'
import { useState, type ReactElement } from 'react'

export default function SubscriptionPage(): ReactElement {
  const [memberSelected, setMemberSelected] = useState<any>(null)

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
