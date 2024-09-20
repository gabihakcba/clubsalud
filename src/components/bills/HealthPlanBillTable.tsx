import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { deletePlanPayment, getBilled } from 'queries/payments'
import { useState, type ReactElement } from 'react'

export default function HealthPlanBillTable(): ReactElement {
  const query = useQueryClient()

  const [selected, setSelected] = useState<number | null>(null)

  const filters = {
    'member.dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'subscription.member.dni': {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH
    }
  }

  const { data: billed } = useQuery({
    queryKey: ['billed'],
    queryFn: async () => {
      return await getBilled()
    }
  })

  const { mutate: deleteBill, isPending: deletingPayment } = useMutation({
    mutationFn: async (id: number) => {
      return await deletePlanPayment(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['payments'] })
      await query.refetchQueries({ queryKey: ['billed'] })
    }
  })

  return (
    <DataTable
      scrollable
      scrollHeight='35dvh'
      stripedRows
      value={billed}
      filters={filters}
      filterDisplay='menu'
      header={() => <h2>Consultas Cobradas</h2>}
      emptyMessage='Sin cobros'
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
        body={(e) => {
          const paid = e.subscription.paid
          return (
            <Tag
              severity={paid ? 'success' : 'danger'}
              className='w-full'
            >
              {paid ? 'Si' : 'No'}
            </Tag>
          )
        }}
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
      <Column
        body={(e) => {
          return (
            <Button
              icon='pi pi-trash'
              size='small'
              severity='danger'
              outlined
              onClick={() => {
                setSelected(e.id as number)
                deleteBill(e.id as number)
              }}
              loading={deletingPayment && selected === e.id}
            />
          )
        }}
      />
    </DataTable>
  )
}
