import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import {
  deleteParticularPayment,
  getPayments
} from 'queries/ClubSalud/payments'
import { useRef, useState, type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type Payment } from 'utils/ClubSalud/types'

export default function BillTable(): ReactElement {
  const query = useQueryClient()
  const [selected, setSelected] = useState<number | null>(null)

  const [globalFilter, setGlobalFilter] = useState('')

  const dt = useRef<DataTable<any>>(null)

  const exportCSV = (selectionOnly): void => {
    dt.current?.exportCSV({ selectionOnly })
  }

  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      return await getPayments()
    }
  })

  const { mutate: deleteBill, isPending: deleting } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteParticularPayment(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['payments'] })
    }
  })

  return (
    <>
      <ConfirmDialog />
      <DataTable
        value={payments}
        ref={dt}
        scrollable
        scrollHeight='67dvh'
        size='small'
        paginator
        paginatorPosition='bottom'
        alwaysShowPaginator
        rows={20}
        globalFilter={globalFilter}
        globalFilterFields={['Member.name', 'Member.lastName', 'Member.dni']}
        header={() => {
          return (
            <div className='flex flex-row gap-4 p-2 align-items-center'>
              <InputText
                placeholder='Buscar...'
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value)
                }}
              />
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
          )
        }}
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='Member.name'
          header='Alumno'
          body={(row) => (
            <p>
              {row.Member?.name} {row.Member?.lastName}
            </p>
          )}
        />
        <Column
          field='Member.dni'
          header='DNI'
        />
        <Column
          field='amount'
          header='Cantidad'
        />
        <Column
          field='date'
          header='Fecha'
          body={(row: Payment) => <p>{DateUtils.formatToDDMMYY(row.date)}</p>}
        />
        <Column
          body={(e) => {
            return (
              <Button
                icon='pi pi-trash'
                severity='danger'
                size='small'
                outlined
                loading={selected === e.id && deleting}
                onClick={() => {
                  confirmDialog({
                    message: 'Confirmar eliminación',
                    header: 'Confirmación',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Eliminar',
                    rejectLabel: 'Cancelar',
                    accept: () => {
                      setSelected(e.id as number)
                      deleteBill(e.id as number)
                    }
                  })
                }}
              />
            )
          }}
        />
      </DataTable>
    </>
  )
}
