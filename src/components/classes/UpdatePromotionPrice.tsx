import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { createPromotionRecord } from 'queries/promotionRecords'
import { useState, type ReactElement } from 'react'
import { type Promotion } from 'utils/types'
import { useModal } from 'utils/useModal'
import PromotionRecordsTable from './PromotionRecordsTable'

export default function UpdatePromotionPrice({
  promotion
}: {
  promotion: Promotion
}): ReactElement {
  const query = useQueryClient()
  const [newPrice, setNewPrice] = useState<number>(promotion.amountPrice)
  const [promotionRecord, openPromotionRecord, closePromotionRecord] =
    useModal(false)
  const { mutate: updatePrice, isPending: isUpdating } = useMutation({
    mutationFn: async (data: { id: number; price: number }) => {
      return await createPromotionRecord(data)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['promotions'] })
    }
  })

  return (
    <form
      action=''
      className='flex flex-column pt-4 gap-4'
    >
      <FloatLabel>
        <InputNumber
          value={newPrice}
          onChange={(data) => {
            setNewPrice(Number(data.value))
          }}
          maxFractionDigits={2}
        />
        <label htmlFor=''>Nuevo precio</label>
      </FloatLabel>
      <Button
        type='button'
        label='Actualizar'
        severity='danger'
        outlined
        icon='pi pi-upload'
        iconPos='right'
        loading={isUpdating}
        onClick={() => {
          confirmDialog({
            message: 'Actualización de precio',
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            accept: () => {
              if (newPrice !== promotion.amountPrice) {
                updatePrice({ id: promotion.id, price: newPrice })
              }
            }
          })
        }}
      />
      <Button
        type='button'
        label='Ver Histórico'
        size='small'
        severity='success'
        icon='pi pi-info-circle'
        iconPos='right'
        outlined
        onClick={() => {
          openPromotionRecord()
        }}
      />
      <Dialog visible={promotionRecord} onHide={closePromotionRecord} header='Historial de Precios'>
        <PromotionRecordsTable promotion={promotion}/>
      </Dialog>
    </form>
  )
}
