'use client'

import { useQuery } from '@tanstack/react-query'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { getSubscriptions } from 'queries/subscriptions'
import { useState, type ReactElement, useEffect } from 'react'
import { type dateType, type Subscription } from 'utils/types'
import { Button } from 'primereact/button'
import { FilterMatchMode } from 'primereact/api'
import { arg2Date, argGetMonth, argGetYear } from 'utils/dates'

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

export default function BillsTable(): ReactElement {
  const [filterSubscriptions, setFilterSubscription] = useState<Subscription[]>(
    []
  )
  const [selectedDate, setSelectedDate] = useState<dateType | null>(null)
  const filters = {
    'member.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  }

  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      return await getSubscriptions()
    }
  })

  useEffect(() => {
    if (subscriptions && selectedDate) {
      setFilterSubscription(
        subscriptions.filter(
          (subscription: Subscription) =>
            argGetMonth(subscription.date) === selectedDate.month &&
            argGetYear(subscription.date) === selectedDate.year
        )
      )
    } else if (subscriptions) {
      setFilterSubscription(subscriptions)
    }
  }, [subscriptions, selectedDate])

  return (
    <DataTable
      header={() => (
        <div className='flex align-items-center justify-content-end gap-4'>
          <Calendar
            view='month'
            dateFormat='mm/yy'
            onChange={(e) => {
              if (e.value) {
                setSelectedDate({
                  month: argGetMonth(arg2Date(e.value)),
                  year: argGetYear(arg2Date(e.value))
                })
              }
            }}
          />
          <Button
            icon='pi pi-filter-slash'
            onClick={() => {
              setSelectedDate(null)
            }}
          />
          <Tag
            value={`Total: ${totalToPaid(filterSubscriptions)}`}
            severity='info'
          />
          <Tag
            value={`Pagado: ${totalPaid(filterSubscriptions)}`}
            severity='success'
          />
          <Tag
            value={`Faltante: ${totalRemaining(filterSubscriptions)}`}
            severity='danger'
          />
        </div>
      )}
      value={filterSubscriptions}
      scrollable
      scrollHeight='70dvh'
      stripedRows
      filters={filters}
      filterDisplay='menu'
    >
      <Column
        field='id'
        header='ID'
        sortable
      />
      <Column
        field='member.name'
        header='Alumno'
        sortable
      />
      <Column
        field='member.dni'
        header='DNI'
        sortable
        filter
        filterPlaceholder='DNI'
      />
      <Column
        field='promotion.title'
        header='Plan'
        sortable
      />
      <Column
        field='total'
        header='Total'
        sortable
      />
      <Column
        field='remaining'
        header='Faltante'
        sortable
      />
      <Column
        field='date'
        header='Fecha'
        sortable
      />
      <Column
        field='paid'
        header='Pagado'
        sortable
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
