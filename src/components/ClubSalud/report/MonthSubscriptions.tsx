import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getSubscriptions } from 'queries/ClubSalud/subscriptions'
import { useState, type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
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
  const [date, setDate] = useState<Date>(DateUtils.getCurrentDate())

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
        field='Promotion.title'
      />
      <Column
        header='Oferta'
        field='Plan.title'
      />
      <Column
        header='Fecha'
        body={(sub: Subscription) => <div>{DateUtils.formatToDDMMYY(sub.date)}</div>}
      />
      <Column
        header='Nombre'
        field='Member.name'
      />
      <Column
        header='Apellido'
        field='Member.lastName'
      />
    </DataTable>
  )
}
