import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import {
  deleteSubscription,
  updateIsByOS,
  updateState
} from 'queries/ClubSalud/subscriptions'
import { type ReactElement, useState } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type Subscription, type Member } from 'utils/ClubSalud/types'

export default function SubscriptionTable({
  member
}: {
  member: Member
}): ReactElement {
  const query = useQueryClient()

  const [selectedSubs, setSelectedSubs] = useState<Subscription | null>(null)

  const { mutate: change, isPending: loadingChange } = useMutation({
    mutationFn: async (id: number) => {
      if (selectedSubs !== null) {
        await updateState(id, !selectedSubs.active)
      }
    },
    onSuccess: async () => {
      setSelectedSubs(null)
      await query.resetQueries({ queryKey: ['members'] })
    }
  })

  const { mutate: changeIsByOs, isPending: loadingChangeIsByOs } = useMutation({
    mutationFn: async (id: number) => {
      if (selectedSubs !== null) {
        await updateIsByOS(id, !selectedSubs.isByOS)
      }
    },
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
      value={member.Subscription}
      scrollable
      scrollHeight='20dvh'
    >
      <Column
        header='ID'
        field='id'
      />
      <Column
        field='Promotion.title'
        header='Promoción'
      />
      <Column
        field='remainingClasses'
        header='Clases disponibles'
      />
      <Column
        field='initialDate'
        header='Inicio'
        body={(subs: Subscription) => (
          <span>{DateUtils.formatToDDMMYY(subs.initialDate)}</span>
        )}
      />
      <Column
        field='expirationDate'
        header='Vencimiento'
        body={(subs: Subscription) => (
          <span>
            {DateUtils.formatToDDMMYY(
              DateUtils.newDate(subs.expirationDate ?? '')
            )}
          </span>
        )}
      />
      <Column
        header='Estado'
        body={(subs: Subscription) => {
          if (Number(member.dni) === 40439867) {
            console.log(subs)
          }
          const state = subs.active
          return (
            <Tag severity={state ? 'success' : 'danger'}>
              {state ? 'Activa' : 'Vencida'}
            </Tag>
          )
        }}
      />
      <Column
        field='Plan.title'
        header='Oferta'
      />
      <Column
        header='Cobro de Obra Social'
        body={(subscription) => {
          const status = subscription.isByOS
          return (
            <Tag
              className='w-full'
              severity={status ? 'success' : 'danger'}
            >
              {status ? 'SI' : 'NO'}
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
                setSelectedSubs(e as Subscription)
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
              label={e.isByOS ? 'Quitar cobros de OS' : 'Agregar cobros de OS'}
              size='small'
              outlined
              severity={e.isByOS ? 'danger' : 'success'}
              onClick={() => {
                setSelectedSubs(e as Subscription)
                changeIsByOs(e.id as number)
              }}
              loading={loadingChangeIsByOs && e.id === selectedSubs?.id}
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
                setSelectedSubs(e as Subscription)
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
