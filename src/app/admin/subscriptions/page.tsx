'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
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
  const [selectedSubs, setSelectedSubs] = useState<any>(null)

  const { data: members, refetch } = useQuery({
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

  const { mutate: change, isPending: loadingChange } = useMutation({
    mutationFn: updateSubscription,
    onSuccess: async () => {
      setSelectedSubs(null)
      await refetch()
    }
  })

  const { mutate: delete_, isPending: loadingDelete } = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: async () => {
      setSelectedSubs(null)
      await refetch()
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
        <Column
          header='Estado'
          body={(subs) => {
            const state = subs.active
            return (
              <Tag severity={state ? 'success' : 'danger'}>
                {state ? 'Activa' : 'Vencida'}
              </Tag>
            )
          }}
        />
        <Column
          body={(e) => {
            return (
              <Button
                label='Cambiar estado'
                size='small'
                outlined
                severity='warning'
                onClick={() => {
                  setSelectedSubs(e)
                  change(e.id)
                }}
                loading={loadingChange && e.id === selectedSubs?.id}
              />
            )
          }}
        />

        <Column
          body={(e) => {
            return (
              <Button
                label='Eliminar'
                size='small'
                outlined
                severity='danger'
                onClick={() => {
                  delete_(e.id)
                }}
                loading={loadingDelete && e.id === selectedSubs?.id}
              />
            )
          }}
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
