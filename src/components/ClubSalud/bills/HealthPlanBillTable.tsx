import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { deletePlanPayment, getBilled } from 'queries/ClubSalud/payments'
import { useRef, useState, type ReactElement } from 'react'
import { hasPermission } from 'utils/ClubSalud/auth'
import { DateUtils } from 'utils/ClubSalud/dates'
import { Permissions, type BilledConsultation } from 'utils/ClubSalud/types'

export default function HealthPlanBillTable(): ReactElement {
  const query = useQueryClient()

  const [selected, setSelected] = useState<number | null>(null)

  const [globalFilter, setGlobalFilter] = useState('')

  const dt = useRef<DataTable<any>>(null)

  const exportCSV = (selectionOnly): void => {
    dt.current?.exportCSV({ selectionOnly })
  }

  const { data: billedConsultation } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getBilled()
    }
  })

  const { mutate: deleteBill, isPending: deletingPayment } = useMutation({
    mutationFn: async (id: number) => {
      return await deletePlanPayment(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['members'] })
    }
  })

  return (
    <>
      <ConfirmDialog />
      <DataTable
        value={billedConsultation}
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
        {hasPermission([Permissions.OWN]) && (
          <Column
            field='id'
            header='ID'
          />
        )}
        <Column
          field='Subscription.Member.name'
          header='Alumno'
          body={(row: BilledConsultation) => (
            <p>
              {row.Subscription?.Member?.name}{' '}
              {row.Subscription?.Member?.lastName}
            </p>
          )}
        />
        <Column
          field='Subscription.Member.dni'
          header='DNI'
        />
        {hasPermission([Permissions.OWN]) && (
          <Column
            field='amount'
            header='Cantidad'
          />
        )}
        <Column
          field='date'
          header='Fecha'
          body={(row: BilledConsultation) => (
            <p>{DateUtils.formatToDDMMYY(row.date)}</p>
          )}
        />
        <Column
          field='autorizationNumber'
          header='Número de autorización'
        />
        <Column
          body={(e) => {
            return (
              <Button
                icon='pi pi-trash'
                severity='danger'
                size='small'
                outlined
                loading={selected === e.id && deletingPayment}
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
