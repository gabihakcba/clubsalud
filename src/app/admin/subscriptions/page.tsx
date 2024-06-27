'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getMembers } from 'queries/members'
import { useState, type ReactElement } from 'react'

export default function SubscriptionPage(): ReactElement {
  const [memberSelected, setMemberSelected] = useState<any>(null)

  const { data: members } = useQuery({
    queryKey: ['mem'],
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

  const rowExpansionTemplate = (member): ReactElement => {
    return (
      <DataTable
        value={member.memberSubscription}
        scrollable
        scrollHeight='20dvh'
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='promotion.title'
          header='Promoción'
        />
        <Column
          field='remainingClasses'
          header='Clases disponibles'
        />
        <Column
          field='expirationDate'
          header='Vencimiento'
        />
      </DataTable>
    )
  }

  return (
    <Card className='h-full'>
      <DataTable
        header='Suscripciones'
        value={members}
        scrollable
        scrollHeight='80dvh'
        onRowToggle={(e) => {
          setMemberSelected(e.data)
        }}
        expandedRows={memberSelected}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column
          expander
          style={{ width: '5rem' }}
        />
        <Column
          field='name'
          header='Nombre'
        />
        <Column
          field='dni'
          header='DNI'
        />
      </DataTable>
    </Card>
  )
}
