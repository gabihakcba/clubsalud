'use client'

import { useState, type ReactElement, useEffect } from 'react'
import { useModal } from 'utils/useModal'
import CreateEmployeePaymentForm from './CreateEmployeePaymentForm'
import { type EmployeePayment } from 'utils/types'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { confirmDialog } from 'primereact/confirmdialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteEmployeePayment,
  getEmployeePayments
} from 'queries/employeePayments'
import { FilterMatchMode } from 'primereact/api'
import { Tag } from 'primereact/tag'

const getAccounting = (payments: EmployeePayment[], setPaid): void => {
  const paid = payments.reduce(
    (acc: number, curr: EmployeePayment) => acc + curr.amount,
    0
  )
  setPaid(paid)
}

export function EmployeePaymentsSection(): ReactElement {
  const [createPayment, openPayment, closePayment] = useModal(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const filters = {
    'employee.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  }
  const [paid, setPaid] = useState<number | null>(null)

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
    if (employeePayments) {
      getAccounting(employeePayments, setPaid)
    }
  }, [employeePayments])

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
        value={employeePayments}
        header={() => (
          <nav className='flex gap-4 align-items-center justify-content-between'>
            <Button
              onClick={openPayment}
              label='Generar Pago'
              size='small'
              icon='pi pi-plus'
              iconPos='right'
            />
            <Tag
              value={`Pagado: ${paid}`}
              severity='success'
            />
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
          field='employee.name'
          header='Empleado'
        />
        <Column
          field='employee.dni'
          header='DNI'
          filter
          filterPlaceholder='DNI'
        />
        <Column
          field='amount'
          header='Pago'
        />
        <Column
          field='date'
          header='Fecha de pago'
        />
        <Column
          field='monthPayment'
          header='Mes trabajado'
        />
        <Column
          field='hoursWorked'
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
