'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteHealthPlan, getHealthPlans } from 'queries/ClubSalud/health'
import { useState, type ReactElement } from 'react'
import { type HealthPlan } from 'utils/ClubSalud/types'
import HealthCard from './HealthCard'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import HealthRecordsTable from './HealthRecordsTable'

export default function PromotionSection(): ReactElement {
  const [planSelected, setPlanSelected] = useState<any>(null)
  const [editPlan, openEditPlan, closeEditPlan] = useModal(false)
  const [records, openRecords, closeRecords] = useModal(false)
  const query = useQueryClient()

  const { mutate: deleteH, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number | string): Promise<HealthPlan> => {
      return await deleteHealthPlan(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['health'] })
    }
  })

  const { data } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await getHealthPlans()
      return response
    }
  })

  return (
    <>
      <ConfirmDialog />
      <DataTable
        value={data}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='type'
          header='Tipo'
        />
        <Column
          field='name'
          header='Nombre'
        />
        <Column
          field='description'
          header='Descripción'
        />
        <Column
          field='paymentPerConsultation'
          header='Pago por Consulta'
        />
        <Column
          body={(row) => (
            <Button
              label='Editar'
              size='small'
              icon='pi pi-pen-to-square'
              iconPos='right'
              outlined
              onClick={() => {
                setPlanSelected(row)
                openEditPlan()
              }}
            />
          )}
        />
        <Column
          body={(row) => (
            <Button
              label='Ver Historico'
              size='small'
              icon='pi pi-eye'
              iconPos='right'
              outlined
              severity='success'
              onClick={() => {
                setPlanSelected(row)
                openRecords()
              }}
            />
          )}
        />
        <Column
          body={(row) => (
            <Button
              label='Eliminar'
              size='small'
              icon='pi pi-trash'
              outlined
              iconPos='right'
              severity='danger'
              loading={planSelected?.id === row.id && isDeleting}
              onClick={() => {
                setPlanSelected(row)
                confirmDialog({
                  message: 'Eliminar?',
                  header: 'Confirmación de acción',
                  icon: 'pi pi-exclamation-triangle',
                  acceptLabel: 'Si',
                  defaultFocus: 'reject',
                  accept() {
                    deleteH(Number(row.id))
                  }
                })
              }}
            />
          )}
        />
      </DataTable>
      <Dialog
          visible={records}
          onHide={closeRecords}
          header='Precios Históricos'
        >
          <HealthRecordsTable healthPlan={planSelected} />
        </Dialog>
      <Dialog
        header='Editar Plan'
        visible={editPlan}
        onHide={closeEditPlan}
      >
        <HealthCard plan={planSelected} />
      </Dialog>
    </>
  )
}
