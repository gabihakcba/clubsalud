import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { type Nullable } from 'primereact/ts-helpers'
import { changeMethod, getPayments } from 'queries/ClubSalud/payments'
import { useState, type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type Payment } from 'utils/ClubSalud/types'

const filterByDate = (bills: Payment[], date: Nullable<Date>): Payment[] => {
  return bills.filter(
    (bill: Payment) =>
      moment(bill.date).isSame(date, 'month') &&
      moment(bill.date).isSame(date, 'year')
  )
}

export default function MonthBills(): ReactElement {
  const [date, setDate] = useState<Date>(DateUtils.getCurrentDate())
  const [selectedBill, setSelectedBill] = useState<number | null>(null)

  const query = useQueryClient()

  const { data: bills, isLoading } = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      return await getPayments()
    }
  })

  const { mutate: changePaymentMethod, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await changeMethod(
        id,
        !bills?.filter((b) => b.id === id)[0].isCash
      )
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['bills'] })
    }
  })

  return (
    <DataTable
      value={filterByDate(bills ?? [], date)}
      loading={isLoading}
    >
      <Column
        header='ID'
        field='id'
      />
      <Column
        header='Nombre'
        field='Member.name'
      />
      <Column
        header='Apellido'
        field='Member.lastName'
      />
      <Column
        header='DNI'
        field='Member.dni'
      />
      <Column
        header='Total'
        field='amount'
      />
      <Column
        header='Metodo'
        sortable
        sortField='isCash'
        body={(bill: Payment) => {
          return (
            <div className='flex gap-2'>
              <Tag severity={bill?.isCash ? 'success' : 'info'}>
                {bill?.isCash ? 'Efectivo' : 'Transferencia'}
              </Tag>
              <Button
                size='small'
                outlined
                severity='danger'
                label='Cambiar método'
                onClick={() => {
                  setSelectedBill(bill.id)
                  changePaymentMethod(bill.id)
                }}
                loading={isPending && selectedBill === bill.id}
              />
            </div>
          )
        }}
      />
      <Column
        header={() => {
          return (
            <div>
              <h4>Fecha</h4>
              <Calendar
                value={date}
                view='month'
                dateFormat='mm/yy'
                placeholder='Filtrar fecha'
                onChange={(e) => {
                  setDate(e.value ?? DateUtils.getCurrentDate())
                }}
              />
            </div>
          )
        }}
        sortable
        body={(bill) => {
          return <div>{DateUtils.formatToDDMMYY(bill.date as Date)}</div>
        }}
      />
      <Column
        header='Plan'
        field='Subscription.Promotion.title'
      />
      <Column
        header='Oferta'
        field='Subscription.Plan.title'
      />
      <Column
        header='Fecha de plan'
        body={(bill) => {
          return <div>{DateUtils.formatToDDMMYY(bill.Subscription.date as Date)}</div>
        }}
      />
    </DataTable>
  )
}
