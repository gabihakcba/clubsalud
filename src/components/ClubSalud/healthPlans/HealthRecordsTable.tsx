import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { deleteHealthRecord } from 'queries/ClubSalud/healthRecords'
import { useEffect, useState, type ReactElement } from 'react'
import { type HealthPlan } from 'utils/ClubSalud/types'

export default function healthRecordsTable({
  healthPlan
}: {
  healthPlan: HealthPlan
}): ReactElement {
  const query = useQueryClient()

  const [plan, setPlan] = useState<HealthPlan>(healthPlan)
  const [selected, setSelected] = useState<number>(0)
  const { mutate: deleteRecord, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteHealthRecord(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['health'] })
    }
  })

  useEffect(() => {
    setPlan(healthPlan)
  }, [])

  return (
    <DataTable value={plan.HealthPlanRecord}>
      <Column
        field='id'
        header='ID'
      />
      <Column
        field='date'
        header='Fecha'
        sortable
      />
      <Column
        field='amount'
        header='Pago por consulta'
      />
      <Column
        body={(row) => {
          return (
            <Button
              icon='pi pi-trash'
              size='small'
              outlined
              severity='danger'
              loading={selected === row.id && isDeleting}
              onClick={() => {
                setSelected(row.id as number)
                confirmDialog({
                  message: 'Eliminar entrada',
                  acceptLabel: 'Eliminar',
                  rejectLabel: 'Cancelar',
                  accept: () => {
                    deleteRecord(Number(row.id))
                  }
                })
              }}
            />
          )
        }}
      />
    </DataTable>
  )
}
