'use client'

import { useState, type ReactElement, useEffect } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import CreateEmployeePaymentForm from './CreateEmployeePaymentForm'
import { type dateType, type EmployeePayment } from 'utils/ClubSalud/types'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { confirmDialog } from 'primereact/confirmdialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteEmployeePayment,
  getEmployeePayments
} from 'queries/ClubSalud/employeePayments'
import { FilterMatchMode } from 'primereact/api'
import { Calendar } from 'primereact/calendar'
import { DateUtils } from 'utils/ClubSalud/dates'

export function EmployeePaymentsSection(): ReactElement {
  const [filterPayments, setFilterPayments] = useState<EmployeePayment[]>([])
  const [selectedDate, setSelectedDate] = useState<dateType | null>(null)
  const [createPayment, openPayment, closePayment] = useModal(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const filters = {
    'Employee.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  }

  const query = useQueryClient()

  const { data: employeePayments } = useQuery({
    queryKey: ['employeePayments'],
    queryFn: async () => {
      return await getEmployeePayments()
    }
  })

  const {
    mutate: deleteEmployeePayment_,
    isPending: isPendingDeleteEmployeePayment
  } = useMutation({
    mutationFn: deleteEmployeePayment,
    onSuccess: async (data) => {
      query.setQueryData(['employeePayments'], (oldData: EmployeePayment[]) => {
        const index = oldData.findIndex(
          (employeePayment: EmployeePayment) =>
            Number(employeePayment.id) === Number(data.id)
        )
        const newData = [...oldData]
        newData.splice(index, 1)
        return newData
      })
    }
  })

  useEffect(() => {
    if (employeePayments && selectedDate) {
      setFilterPayments(
        employeePayments.filter(
          (pay: EmployeePayment) =>
            DateUtils.getMonth(pay.date) === selectedDate.month &&
            DateUtils.getYear(pay.date) === selectedDate.year
        )
      )
    } else if (employeePayments) {
      setFilterPayments(employeePayments)
    }
  }, [employeePayments, selectedDate])

  return (
    <div className='flex flex-column'>
      <Dialog
        visible={createPayment}
        onHide={closePayment}
        header='Generar Pago'
      >
        <CreateEmployeePaymentForm closeModal={closePayment} />
      </Dialog>
      <DataTable
        value={filterPayments}
        header={() => (
          <nav className='flex gap-4 align-items-center justify-content-between'>
            <div className='flex align-items-center gap-4'>
              <h3>Empleados</h3>
              <Button
                onClick={openPayment}
                label='Generar Pago'
                size='small'
                icon='pi pi-plus'
                iconPos='right'
              />
            </div>
            <div className='flex gap-4'>
              <Calendar
                view='month'
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
          </nav>
        )}
        filters={filters}
        filterDisplay='menu'
        scrollable
        scrollHeight='38dvh'
      >
        <Column
          field='id'
          header='ID'
          sortable
        />
        <Column
          field='Employee.name'
          header='Empleado'
          sortable
        />
        <Column
          field='Employee.dni'
          header='DNI'
          filter
          filterPlaceholder='DNI'
          sortable
        />
        <Column
          field='amount'
          header='Pago'
          sortable
        />
        <Column
          field='date'
          header='Fecha de pago'
          sortable
          body={(row: EmployeePayment) => DateUtils.formatToDDMMYY(row.date)}
        />
        <Column
          field='monthPayment'
          header='Mes trabajado'
          sortable
          body={(row: EmployeePayment) =>
            DateUtils.formatToDDMMYY(row.monthPayment)
          }
        />
        <Column
          field='hoursWorked'
          header='Horas trabajadas'
          sortable
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
                isPendingDeleteEmployeePayment &&
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
                    deleteEmployeePayment_(payment.id as number)
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
