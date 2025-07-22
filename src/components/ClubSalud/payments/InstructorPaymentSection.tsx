'use client'

import { type ReactElement, useState, useEffect, useRef } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import { type InstructorPayment, type dateType } from 'utils/ClubSalud/types'
import CreateInstructorPaymentForm from './CreateInstructorPaymentForm'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteInstructorPayment,
  getInstructorPayments
} from 'queries/ClubSalud/instructorPayments'
import { FilterMatchMode } from 'primereact/api'
import { InstructorPriceTable } from './InstructorPriceTable'
import { Calendar } from 'primereact/calendar'
import { DateUtils } from 'utils/ClubSalud/dates'
import { InputText } from 'primereact/inputtext'

export function InstructorPaymentsSection(): ReactElement {
  const query = useQueryClient()

  const [selectedDate, setSelectedDate] = useState<dateType | null>(null)
  const [fitlerPayments, setFilterPayments] = useState<InstructorPayment[]>([])
  const [createPayment, openPayment, closePayment] = useModal(false)
  const [instructorTable, openInstructorTable, closeInstructorTable] =
    useModal(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const filters = {
    'Instructor.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  }

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
    if (instructorPayments && selectedDate) {
      setFilterPayments(
        instructorPayments.filter(
          (pay: InstructorPayment) =>
            DateUtils.getMonth(pay.paymentDate) === selectedDate.month &&
            DateUtils.getYear(pay.paymentDate) === selectedDate.year
        )
      )
    } else if (instructorPayments) {
      setFilterPayments(instructorPayments)
    }
  }, [instructorPayments, selectedDate])

  const [globalFilter, setGlobalFilter] = useState('')
  const dt = useRef<DataTable<any>>(null)
  const exportCSV = (selectionOnly): void => {
    dt.current?.exportCSV({ selectionOnly })
  }

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
        <InstructorPriceTable />
      </Dialog>
      <DataTable
        value={fitlerPayments}
        ref={dt}
        scrollable
        scrollHeight='75dvh'
        size='small'
        paginator
        paginatorPosition='bottom'
        alwaysShowPaginator
        rows={20}
        globalFilter={globalFilter}
        globalFilterFields={[
          'Instructor.name',
          'Instructor.lastName',
          'Instructor.dni'
        ]}
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
              <InputText
                placeholder='Buscar...'
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value)
                }}
              />
              <div className='flex align-items-center gap-4'>
                <Calendar
                  view='month'
                  placeholder='Filtrar por fecha...'
                  dateFormat='mm/yy'
                  onChange={(e) => {
                    if (e.value) {
                      setSelectedDate({
                        month: DateUtils.getMonth(e.value),
                        year: DateUtils.getYear(e.value)
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
              </div>
              <Button
                type='button'
                icon='pi pi-file'
                rounded
                onClick={() => {
                  exportCSV(false)
                }}
                data-pr-tooltip='CSV'
              />
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
          field='Instructor.name'
          header='Profesor'
        />
        <Column
          field='Instructor.dni'
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
          body={(row: InstructorPayment) =>
            DateUtils.formatToDDMMYY(row.paymentDate)
          }
        />
        <Column
          field='workedMonth'
          header='Mes trabajado'
          body={(row: InstructorPayment) =>
            DateUtils.formatToDDMMYY(row.workedMonth)
          }
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
