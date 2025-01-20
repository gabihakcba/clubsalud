import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getSubscriptions } from 'queries/ClubSalud/subscriptions'
import { useState, type ReactElement } from 'react'
import { argDate, argDate2Format } from 'utils/ClubSalud/dates'
import { type Subscription } from 'utils/ClubSalud/types'

const getByMonth = (
  subscription: Subscription[],
  date: Date
): Subscription[] => {
  return subscription.filter(
    (sub: Subscription) =>
      moment(date).isSame(sub.date, 'month') &&
      moment(date).isSame(sub.date, 'year')
  )
}

export default function MonthSubscriptions(): ReactElement {
  const [date, setDate] = useState<Date>(argDate())

  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => await getSubscriptions()
  })

  return (
    <DataTable
      value={getByMonth(subscriptions ?? [], date)}
      scrollHeight='30rem'
      header={() => {
        return (
          <Calendar
            view='month'
            dateFormat='mm/yy'
            onChange={(e) => {
              console.log(e.value)
              if (e.value) {
                setDate(e.value)
              }
            }}
          />
        )
      }}
    >
      <Column
        header='ID'
        field='id'
      />
      <Column
        header='Plan'
        field='promotion.title'
      />
      <Column
        header='Oferta'
        field='plan.title'
      />
      <Column
        header='Fecha'
        body={(sub: Subscription) => <div>{argDate2Format(sub.date)}</div>}
      />
      <Column
        header='Nombre'
        field='member.name'
      />
      <Column
        header='Apellido'
        field='member.lastName'
      />
    </DataTable>
  )
}
