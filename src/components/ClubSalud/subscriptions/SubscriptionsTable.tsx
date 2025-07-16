import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { Tag } from 'primereact/tag'
import {
  deleteSubscription,
  updateIsByOS,
  updateState
} from 'queries/ClubSalud/subscriptions'
import { type ReactElement, useState } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type Subscription } from 'utils/ClubSalud/types'
import { showToast } from '../toastService'

export default function SubscriptionTable({
  subscriptions
}: {
  subscriptions: Subscription[]
}): ReactElement {
  const [globalFilter, setGlobalFilter] = useState('')

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
      showToast('success', 'Listo', 'Suscripcion actualizada correctamente')
      await query.resetQueries({ queryKey: ['subscriptions'] })
    },
    onError: () => {
      showToast(
        'error',
        'Error',
        'Se produjo un error al actualizar la suscripción'
      )
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
      showToast('success', 'Listo', 'Suscripcion actualizada correctamente')
      await query.resetQueries({ queryKey: ['subscriptions'] })
    },
    onError: () => {
      showToast(
        'error',
        'Error',
        'Se produjo un error al actualizar la suscripción'
      )
    }
  })

  const { mutate: delete_, isPending: loadingDelete } = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: async () => {
      showToast('success', 'Listo', 'Suscripcion eliminada correctamente')
      setSelectedSubs(null)
      await query.resetQueries({ queryKey: ['subscriptions'] })
    },
    onError: () => {
      showToast(
        'error',
        'Error',
        'Se produjo un error al eliminar la suscripción'
      )
    }
  })

  return (
    <DataTable
      value={subscriptions}
      scrollable
      paginator
      rows={20}
      scrollHeight='82dvh'
      size='small'
      paginatorPosition='bottom'
      alwaysShowPaginator
      globalFilter={globalFilter}
      globalFilterFields={['Member.name', 'Member.lastName', 'Member.dni']}
      header={() => {
        return (
          <div className='flex flex-row gap-4 p-2 align-items-center'>
            <p>Suscripciones</p>
            <InputText
              placeholder='Buscar...'
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value)
              }}
            />
          </div>
        )
      }}
    >
      <Column
        header='ID'
        field='id'
        sortable
      />
      <Column
        field='Promotion.title'
        header='Promoción'
        style={{ minWidth: '150px' }}
      />
      <Column
        field='remainingClasses'
        header='Clases'
      />
      <Column
        field='initialDate'
        header='Inicio'
        body={(subs: Subscription) => (
          <span style={{ minWidth: '200px' }}>
            {DateUtils.formatToDDMMYY(subs.initialDate)}
          </span>
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
        field='Member.name'
        header='Alumno'
        body={(row: Subscription) => (
          <p>
            {row.Member.name} {row.Member.lastName}
          </p>
        )}
      />
      <Column
        field='Member.dni'
        header='DNI'
      />
      <Column
        header='Obra Social'
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
              className='w-full'
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
