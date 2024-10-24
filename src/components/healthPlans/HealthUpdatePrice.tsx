import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { createHealthRecord } from 'queries/healthRecords'
import { useEffect, useState, type ReactElement } from 'react'
import { type HealthPlan } from 'utils/types'
import { useModal } from 'utils/useModal'
import HealthRecordsTable from './HealthRecordsTable'

export default function HealthUpdatePrice({
  healthPlan
}: {
  healthPlan: HealthPlan
}): ReactElement {
  const query = useQueryClient()

  const [plan, setPlan] = useState<HealthPlan>(healthPlan)
  const [newPrice, setNewPrice] = useState<number>(healthPlan.paymentPerConsultation)
  const [records, openRecords, closeRecords] = useModal(false)

  const { mutate: updatePrice, isPending: isUpdating } = useMutation({
    mutationFn: async (data: { id: number; price: number }) => {
      return await createHealthRecord(data)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['health'] })
    }
  })

  useEffect(() => {
    setPlan(healthPlan)
  }, [healthPlan])

  return (
    <form
      action=''
      className='flex flex-column pt-4 gap-4'
    >
      <FloatLabel>
        <InputNumber
          value={newPrice}
          maxFractionDigits={2}
          defaultValue={90}
          onChange={(data) => {
            setNewPrice(Number(data.value))
          }}
        />
        <label htmlFor=''>Nuevo precio</label>
      </FloatLabel>
      <Button
        type='button'
        label='Actualizar'
        outlined
        severity='danger'
        icon='pi pi-upload'
        iconPos='right'
        loading={isUpdating}
        onClick={() => {
          confirmDialog({
            message: '¿Seguro que desea actualizar el precio?',
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cacelar',
            accept: () => {
              if (newPrice) {
                updatePrice({ id: plan.id, price: newPrice })
              }
            }
          })
        }}
      />
      <Button
        type='button'
        label='Ver Historico'
        icon='pi pi-info-circle'
        iconPos='right'
        outlined
        size='small'
        severity='success'
        onClick={() => {
          openRecords()
        }}
      />
      <Dialog
        visible={records}
        onHide={closeRecords}
        header='Precios Históricos'
      >
        <HealthRecordsTable healthPlan={plan} />
      </Dialog>
    </form>
  )
}
