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
import { FilterMatchMode } from 'primereact/api'

export default function Page(): ReactElement {
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
  const filters = {
    'member.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'subscription.member.dni': {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH
    }
  }

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
        <CreatePaymentForm />
      </Dialog>
      <Button
        onClick={openCreateBill}
        size='small'
        label='Generar Cobro'
        icon='pi pi-plus'
        iconPos='right'
      />
      <DataTable
        scrollable
        scrollHeight='30dvh'
        stripedRows
        value={payments}
        header={() => <h2>Cobros Particulares</h2>}
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
          field='date'
          header='Fecha de pago'
          sortable
        />
        <Column
          field='amount'
          header='Cantidad'
          sortable
        />
        <Column
          field='subscription.paid'
          header='Pagado'
          sortable
        />
        <Column
          field='subscription.remaining'
          header='Faltante'
          sortable
        />
        <Column
          field='subscription.total'
          header='Total'
          sortable
        />
        <Column
          field='subscription.promotion.title'
          header='Promoción'
          sortable
        />
      </DataTable>
      <DataTable
        scrollable
        scrollHeight='35dvh'
        stripedRows
        value={billed}
        filters={filters}
        filterDisplay='menu'
        header={() => <h2>Consultas cobradas</h2>}
      >
        <Column
          field='id'
          header='ID'
          sortable
        />
        <Column
          field='subscription.member.name'
          header='Alumno'
          sortable
        />
        <Column
          field='subscription.member.dni'
          header='DNI'
          filter
          filterPlaceholder='DNI'
          sortable
        />
        <Column
          field='date'
          header='Fecha de pago'
          sortable
        />
        <Column
          field='amount'
          header='Cantidad'
          sortable
        />
        <Column
          field='subscription.paid'
          header='Pagado'
          sortable
        />
        <Column
          field='subscription.remaining'
          header='Faltante'
          sortable
        />
        <Column
          field='subscription.total'
          header='Total'
          sortable
        />
        <Column
          field='subscription.promotion.title'
          header='Promoción'
          sortable
        />
      </DataTable>
    </Card>
  )
}
