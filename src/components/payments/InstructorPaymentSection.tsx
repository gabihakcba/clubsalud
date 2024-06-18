'use client'

import { type ReactElement, useState, useEffect } from 'react'
import { useModal } from 'utils/useModal'
import {
  type priceType,
  type InstructorPayment,
  type InstructorPrice,
  type Schedule,
  type reportType,
  type dateType,
  Permissions
} from 'utils/types'
import CreateInstructorPaymentForm from './CreateInstructorPaymentForm'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteInstructorPayment,
  getInstructorPayments,
  getInstructorPrice
} from 'queries/instructorPayments'
import { FilterMatchMode } from 'primereact/api'
import { InstructorTable } from './InstructorTable'
import { getSchedules } from 'queries/schedules'
import { Tag } from 'primereact/tag'
import { Calendar } from 'primereact/calendar'
import moment from 'moment'
import HasRole from 'components/HasRole'

const paidAndRemaining = (
  payments: InstructorPayment[],
  total: number,
  setPaid,
  setRemaining
): void => {
  const paid = payments.reduce(
    (acc: number, current: InstructorPayment) => acc + current.amount,
    0
  )
  setPaid(paid)
  setRemaining(total - paid)
}

const currentReport = (
  schedules: Schedule[],
  price: priceType,
  setTotal
): void => {
  const activeSchedules = schedules.filter((sche: Schedule) => sche.charge)

  const totalHoursPerWeek = activeSchedules.length / 2
  const hoursTitlePerWeek =
    activeSchedules.filter((sche: Schedule) => sche.charge?.degree).length / 2
  const hoursNoTitlePerWeek =
    activeSchedules.filter((sche: Schedule) => !sche.charge?.degree).length / 2

  const amountTitlePerWeek = hoursTitlePerWeek * price.title
  const amountNoTitlePerWeek = hoursNoTitlePerWeek * price.notitle
  const amountPerWeek = amountTitlePerWeek + amountNoTitlePerWeek

  const totalHoursPerMonth = totalHoursPerWeek * 4
  const hoursTitlePerMonth = hoursTitlePerWeek * 4
  const hoursNoTitlePerMonth = hoursNoTitlePerWeek * 4
  const amountTitlePerMonth = hoursTitlePerMonth * price.title
  const amountNoTitlePerMonth = hoursNoTitlePerMonth * price.notitle
  const amountPerMonth = amountTitlePerMonth + amountNoTitlePerMonth

  const report: reportType = {
    title: 'Horarios actuales',

    totalHoursPerWeek,
    hoursTitlePerWeek,
    hoursNoTitlePerWeek,
    amountTitlePerWeek,
    amountNoTitlePerWeek,
    amountPerWeek,

    totalHoursPerMonth,
    hoursTitlePerMonth,
    hoursNoTitlePerMonth,
    amountTitlePerMonth,
    amountNoTitlePerMonth,
    amountPerMonth
  }
  setTotal(report.amountPerMonth)
}

export function InstructorPaymentsSection(): ReactElement {
  const query = useQueryClient()

  const [selectedDate, setSelectedDate] = useState<dateType | null>(null)
  const [fitlerPayments, setFilterPayments] = useState<InstructorPayment[]>([])
  const [createPayment, openPayment, closePayment] = useModal(false)
  const [instructorTable, openInstructorTable, closeInstructorTable] =
    useModal(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const filters = {
    'instructor.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  }

  const [price, setPrice] = useState<priceType | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [paid, setPaid] = useState<number | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)

  const { data: schedules } = useQuery({
    queryKey: ['sche'],
    queryFn: async () => {
      return await getSchedules()
    }
  })

  const { data: prices } = useQuery({
    queryKey: ['ins'],
    queryFn: async () => {
      return await getInstructorPrice()
    }
  })

  const { data: instructorPayments } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      return await getInstructorPayments()
    }
  })

  const {
    mutate: deleteInstructorPayment_,
    isPending: isPendingDeleteInstructorPayment
  } = useMutation({
    mutationFn: deleteInstructorPayment,
    onSuccess: async (data) => {
      query.setQueryData(['payments'], (oldData: InstructorPayment[]) => {
        const index = oldData.findIndex(
          (instructorPayment: InstructorPayment) =>
            Number(instructorPayment.id) === Number(data.id)
        )
        const newData = [...oldData]
        newData.splice(index, 1)
        return newData
      })
    }
  })

  useEffect(() => {
    if (price && schedules) {
      currentReport(schedules, price, setTotal)
    }
  }, [price, schedules])

  useEffect(() => {
    if (instructorPayments && selectedDate) {
      setFilterPayments(
        instructorPayments.filter(
          (pay: InstructorPayment) =>
            moment(pay.paymentDate).month() === selectedDate.month &&
            moment(pay.paymentDate).year() === selectedDate.year
        )
      )
    } else if (instructorPayments) {
      setFilterPayments(instructorPayments)
    }
  }, [instructorPayments, selectedDate])

  useEffect(() => {
    if (total && fitlerPayments) {
      paidAndRemaining(fitlerPayments, total, setPaid, setRemaining)
    }
  }, [total, fitlerPayments])

  useEffect(() => {
    if (prices) {
      const lastIndexWithTitle = prices.findIndex(
        (price: InstructorPrice) => price.degree
      )
      const lastIndexWithNoTitle = prices.findIndex(
        (price: InstructorPrice) => !price.degree
      )
      setPrice({
        title: Number(prices[lastIndexWithTitle]?.amount),
        notitle: Number(prices[lastIndexWithNoTitle]?.amount)
      })
    }
  }, [prices])

  return (
    <div className='flex flex-column'>
      <Dialog
        visible={createPayment}
        onHide={closePayment}
        header='Generar Pago'
      >
        <CreateInstructorPaymentForm />
      </Dialog>
      <Dialog
        visible={instructorTable}
        onHide={closeInstructorTable}
        header='Precios por hora'
      >
        <InstructorTable />
      </Dialog>
      <DataTable
        value={fitlerPayments}
        header={() => (
          <nav className='flex flex-row gap-2 justify-content-between'>
            <div className='flex align-items-center gap-4'>
              <Button
                onClick={openPayment}
                label='Generar Pago'
                size='small'
                icon='pi pi-plus'
                iconPos='right'
              />
              <Button
                onClick={openInstructorTable}
                label='Precios por hora'
                size='small'
                icon='pi pi-search'
                iconPos='right'
              />
            </div>
            <div className='flex align-items-center gap-4'>
              <Calendar
                view='month'
                dateFormat='mm/yy'
                onChange={(e) => {
                  setSelectedDate({
                    month: moment(e.value).month(),
                    year: moment(e.value).year()
                  })
                }}
              />
              <Button
                icon='pi pi-filter-slash'
                onClick={() => {
                  setSelectedDate(null)
                }}
              />
              <HasRole required={[Permissions.OWN]}>
                <Tag
                  value={`Total: ${total}`}
                  severity='info'
                />
                <Tag
                  value={`Pagado: ${paid}`}
                  severity='success'
                />
                <Tag
                  value={`Faltante: ${remaining}`}
                  severity='danger'
                />
              </HasRole>
            </div>
          </nav>
        )}
        filters={filters}
        filterDisplay='menu'
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='instructor.name'
          header='Profesor'
        />
        <Column
          field='instructor.dni'
          header='DNI'
          filter
          filterPlaceholder='DNI'
        />
        <Column
          field='amount'
          header='Pago'
        />
        <Column
          field='paymentDate'
          header='Fecha de pago'
        />
        <Column
          field='workedMonth'
          header='Mes trabajado'
        />
        <Column
          field='workedHours'
          header='Horas trabajadas'
        />
        <Column
          body={(payment) => (
            <Button
              label='Eliminar'
              size='small'
              icon='pi pi-trash'
              iconPos='right'
              outlined
              severity='danger'
              loading={
                isPendingDeleteInstructorPayment &&
                payment.id === selectedPayment.id
              }
              onClick={() => {
                setSelectedPayment(payment)
                confirmDialog({
                  message: 'Eliminar este pago?',
                  header: 'Confirmación de acción',
                  icon: 'pi pi-info-circle',
                  defaultFocus: 'reject',
                  acceptClassName: 'p-button-danger',
                  acceptLabel: 'Si',
                  accept() {
                    deleteInstructorPayment_(payment.id as number)
                  }
                })
              }}
            />
          )}
        />
      </DataTable>
    </div>
  )
}
