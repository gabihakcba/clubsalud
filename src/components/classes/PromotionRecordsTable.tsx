import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { deletePromotionRecord } from 'queries/promotionRecords'
import { useState, type ReactElement } from 'react'
import { type PromotionRecord, type Promotion } from 'utils/types'

export default function PromotionRecordsTable({
  promotion
}: {
  promotion: Promotion
}): ReactElement {
  const query = useQueryClient()
  const [selected, setSelected] = useState<PromotionRecord | undefined>(
    undefined
  )

  const { mutate: deleteRecord, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      return await deletePromotionRecord(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['promotions'] })
    }
  })
  return (
    <DataTable value={promotion.record}>
      <Column
        field='id'
        header='ID'
      />
      <Column
        field='date'
        header='Fecha'
      />
      <Column
        field='price'
        header='Precio'
      />
      <Column
        body={(row) => (
          <Button
            type='button'
            icon='pi pi-trash'
            size='small'
            outlined
            severity='danger'
            loading={selected?.id === row.id && isDeleting}
            onClick={() => {
              setSelected(row as PromotionRecord)
              confirmDialog({
                message: 'Eliminación de entrada',
                acceptLabel: 'Aceptar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  deleteRecord(row?.id as number)
                }
              })
            }}
          />
        )}
      />
    </DataTable>
  )
}
