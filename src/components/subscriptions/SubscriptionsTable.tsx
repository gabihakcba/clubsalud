import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { deleteSubscription, updateSubscription } from 'queries/subscriptions'
import { type ReactElement, useState } from 'react'
import { type Member } from 'utils/types'

export default function SubscriptionTable({
  member
}: {
  member: Member
}): ReactElement {
  const query = useQueryClient()

  const [selectedSubs, setSelectedSubs] = useState<any>(null)

  const { mutate: change, isPending: loadingChange } = useMutation({
    mutationFn: updateSubscription,
    onSuccess: async () => {
      setSelectedSubs(null)
      await query.resetQueries({ queryKey: ['members'] })
    }
  })

  const { mutate: delete_, isPending: loadingDelete } = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: async () => {
      setSelectedSubs(null)
      await query.resetQueries({ queryKey: ['members'] })
    }
  })

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
                change(e.id as number)
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
                setSelectedSubs(e)
                delete_(e.id as number)
              }}
              loading={loadingDelete && e.id === selectedSubs?.id}
            />
          )
        }}
      />
    </DataTable>
  )
}
