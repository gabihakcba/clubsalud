'use client'

import { useQuery } from '@tanstack/react-query'
import CreatePaymentForm from 'components/bills/CreatePaymentForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { getBilled, getPayments } from 'queries/payments'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export default function Page(): ReactElement {
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      return await getPayments()
    }
  })
  const { data: billed } = useQuery({
    queryKey: ['billed'],
    queryFn: async () => {
      return await getBilled()
    }
  })
  return (
    <Card className='flex flex-column h-full'>
      <Dialog
        header='Generar Cobro'
        visible={createBill}
        onHide={closeCreateBill}
      >
        <CreatePaymentForm></CreatePaymentForm>
      </Dialog>
      <Button
        onClick={openCreateBill}
        size='small'
        label='Generar Cobro'
        icon='pi pi-plus'
        iconPos='right'
      />
      <DataTable
        value={payments}
        header={() => <h2>Cobros Particulares</h2>}
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
          field='date'
          header='Fecha de pago'
        />
        <Column
          field='amount'
          header='Cantidad'
        />
        <Column
          field='subscription.paid'
          header='Pagado'
        />
        <Column
          field='subscription.remaining'
          header='Faltante'
        />
        <Column
          field='subscription.total'
          header='Total'
        />
        <Column
          field='subscription.promotion.title'
          header='Promoción'
        />
      </DataTable>
      <DataTable
        value={billed}
        header={() => <h2>Consultas cobradas</h2>}
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='subscription.member.name'
          header='Alumno'
        />
        <Column
          field='date'
          header='Fecha de pago'
        />
        <Column
          field='amount'
          header='Cantidad'
        />
        <Column
          field='subscription.paid'
          header='Pagado'
        />
        <Column
          field='subscription.remaining'
          header='Faltante'
        />
        <Column
          field='subscription.total'
          header='Total'
        />
        <Column
          field='subscription.promotion.title'
          header='Promoción'
        />
      </DataTable>
    </Card>
  )
}
