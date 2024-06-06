'use client'

import { useQuery } from '@tanstack/react-query'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { getSubscriptions } from 'queries/subscriptions'
import { type ReactElement } from 'react'
import { type Subscription } from 'utils/types'

const totalRemaining = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce(
    (acc: number, currentValue: Subscription) => acc + currentValue.remaining,
    0
  )
}

const totalPaid = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce(
    (acc: number, currentValue: Subscription) =>
      acc + (currentValue.total - currentValue.remaining),
    0
  )
}

const totalToPaid = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce(
    (acc: number, currentValue: Subscription) => acc + currentValue.total,
    0
  )
}

export default function Accounting(): ReactElement {
  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      return await getSubscriptions()
    }
  })

  return (
    <DataTable
      header={() => (
        <div className='flex align-items-center justify-content-end gap-4'>
          <Tag
            value={`Total: ${totalToPaid(subscriptions ?? [])}`}
            severity='info'
          />
          <Tag
            value={`Pagado: ${totalPaid(subscriptions ?? [])}`}
            severity='success'
          />
          <Tag
            value={`Faltante: ${totalRemaining(subscriptions ?? [])}`}
            severity='danger'
          />
        </div>
      )}
      value={subscriptions}
      scrollable
      scrollHeight='70dvh'
      stripedRows
    >
      <Column
        field='id'
        header='ID'
      />
      <Column
        field='member.name'
        header='Alumno'
      />
      <Column
        field='promotion.title'
        header='Plan'
      />
      <Column
        field='total'
        header='Total'
      />
      <Column
        field='remaining'
        header='Faltante'
      />
      <Column
        field='date'
        header='Fecha'
      />
      <Column
        field='paid'
        header='Pagado'
        body={(elem) => (
          <Tag
            value={elem.paid ? 'Si' : 'No'}
            severity={elem.paid ? 'success' : 'danger'}
          />
        )}
      />
    </DataTable>
  )
}
