import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { deleteHealthSubscribed, editHealthSubscribed } from 'queries/ClubSalud/healthSus'
import { type ReactElement, useState } from 'react'
import { type Member } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'

export default function HealthPlanList({
  member
}: {
  member: Member
}): ReactElement {
  const query = useQueryClient()

  const [isEditing, openEdit, closeEdit] = useModal(false)
  const [selectedHealth, setSelectedHealth] = useState<number | null>(null)
  const [afiliateNumber, setAfiliateNumber] = useState<string>('')

  const { mutate: deletePlan, isPending: deletingHealth } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteHealthSubscribed(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['account'] })
    }
  })

  const { mutate: editPlan, isPending: editingPlan } = useMutation({
    mutationFn: async () => {
      if (selectedHealth) {
        return await editHealthSubscribed(selectedHealth, afiliateNumber)
      }
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['account'] })
    }
  })

  return (
    <>
      <Dialog
        visible={isEditing}
        onShow={() => {
          const ps = member.HealthPlanSubscribed?.find(
            (elem) => elem.id === selectedHealth
          )
          const an = ps?.afiliateNumber
          setAfiliateNumber(an ?? '')
        }}
        onHide={() => {
          setAfiliateNumber('')
          closeEdit()
        }}
        header='Editar'
      >
        <form
          action=''
          className='flex flex-column justify-content-center gap-4 pt-4'
        >
          <FloatLabel>
            <InputText
              value={afiliateNumber}
              onChange={(e) => {
                setAfiliateNumber(e.target.value)
              }}
            />
            <label htmlFor=''>Número de afiliado</label>
          </FloatLabel>
          <Button
            type='button'
            label='Guardar'
            size='small'
            icon='pi pi-upload'
            iconPos='right'
            loading={editingPlan}
            onClick={() => {
              editPlan()
            }}
          />
        </form>
      </Dialog>
      <DataTable
        value={member.HealthPlanSubscribed}
        stripedRows
      >
        <Column
          header='ID'
          field='id'
        />
        <Column
          header='Nombre'
          field='plan.name'
        />
        <Column
          className='border-1'
          header='Número de afiliado'
          field='afiliateNumber'
        />
        <Column
          body={(e) => {
            return (
              <Button
                type='button'
                size='small'
                icon='pi pi-trash'
                outlined
                severity='danger'
                onClick={(d) => {
                  setSelectedHealth(e.id as number)
                  deletePlan(e.id as number)
                }}
                loading={deletingHealth && selectedHealth === e.id}
              />
            )
          }}
        />
        <Column
          body={(e) => {
            return (
              <Button
                type='button'
                size='small'
                label='Editar'
                icon='pi pi-pen-to-square'
                iconPos='right'
                outlined
                severity='warning'
                onClick={() => {
                  setSelectedHealth(e.id as number)
                  openEdit()
                }}
                loading={deletingHealth && selectedHealth === e.id}
              />
            )
          }}
        />
      </DataTable>
    </>
  )
}
