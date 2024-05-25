import { type ReactElement, useState } from 'react'
import { useModal } from 'utils/useModal'
import { type InstructorPayment } from 'utils/types'
import CreateInstructorPaymentForm from './CreateInstructorPaymentForm'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteInstructorPayment } from 'queries/instructorPayments'
import { FilterMatchMode } from 'primereact/api'

interface params {
  instructorPayments: InstructorPayment[] | undefined
}
export function InstructorPaymentsSection({
  instructorPayments
}: params): ReactElement {
  const [createPayment, openPayment, closePayment] = useModal(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const filters = {
    'instructor.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  }

  const query = useQueryClient()

  const {
    mutate: deleteInstructorPayment_,
    isPending: isPendingDeleteInstructorPayment
  } = useMutation({
    mutationFn: deleteInstructorPayment,
    onSuccess: async (data) => {
      query.setQueryData(
        ['instructorPayments'],
        (oldData: InstructorPayment[]) => {
          const index = oldData.findIndex(
            (instructorPayment: InstructorPayment) =>
              Number(instructorPayment.id) === Number(data.id)
          )
          const newData = [...oldData]
          newData.splice(index, 1)
          return newData
        }
      )
    }
  })

  return (
    <div className='flex flex-column'>
      <Dialog
        visible={createPayment}
        onHide={closePayment}
        header='Generar Pago'
      >
        <CreateInstructorPaymentForm />
      </Dialog>
      <DataTable
        value={instructorPayments}
        header={() => (
          <nav className='flex gap-4 align-items-center'>
            <h2>Pagos a profesores</h2>
            <Button
              onClick={openPayment}
              label='Generar Pago'
              size='small'
              icon='pi pi-plus'
              iconPos='right'
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
