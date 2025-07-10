import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import HasRole from 'components/ClubSalud/HasRole'
import CreatePromotionForm from 'components/ClubSalud/promotions/CreatePromotionForm'
import UpdatePromotionForm from 'components/ClubSalud/promotions/UpdatePromotionForm'
import SubscriptionForm from 'components/ClubSalud/subscriptions/SubscriptionForm'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { deletePromotion, getPromotions } from 'queries/ClubSalud/promotions'
import { type ReactElement, useState } from 'react'
import { type Promotion, Permissions } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import PromotionRecordsTable from './PromotionRecordsTable'

export default function PlansTable(): ReactElement {
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [editPromotion, openEditPromotion, closeEditPromotion] = useModal(false)
  const [createPromotion, openCreatePromotion, closeCreatePromotion] =
    useModal(false)
  const [createSubscription, openCreateSubscription, closeCreateSubscription] =
    useModal(false)
  const [promotionRecord, openPromotionRecord, closePromotionRecord] =
    useModal(false)

  const query = useQueryClient()

  const { data: promotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      const response = await getPromotions()
      return response
    }
  })

  const { mutate: delPromotion, isPending } = useMutation({
    mutationFn: deletePromotion,
    onSuccess: async (variables) => {
      await query.setQueryData(['promotions'], (oldData: Promotion[]) => {
        const index = oldData.findIndex((promotion: Promotion) => {
          return promotion.id === variables.id
        })
        const newData = [...oldData]
        newData.splice(index, 1)
        return newData
      })
    }
  })

  return (
    <>
      <Dialog
        visible={promotionRecord}
        onHide={closePromotionRecord}
        header='Historial de Precios'
      >
        <PromotionRecordsTable promotion={selectedPromotion} />
      </Dialog>

      <Dialog
        header='Editar Plan'
        visible={editPromotion}
        onHide={closeEditPromotion}
      >
        <UpdatePromotionForm promotion={selectedPromotion} />
      </Dialog>

      <Dialog
        header='Crear Plan'
        visible={createPromotion}
        onHide={closeCreatePromotion}
      >
        <CreatePromotionForm />
      </Dialog>

      <Dialog
        header='Inscripción'
        visible={createSubscription}
        onHide={closeCreateSubscription}
      >
        <SubscriptionForm />
      </Dialog>

      <DataTable
        value={promotions}
        scrollable
        scrollHeight='35dvh'
        stripedRows
        selectionMode='single'
        selection={selectedPromotion}
        onSelectionChange={(e) => {
          setSelectedPromotion(e.value)
        }}
        header={() => (
          <div className='flex gap-4 align-items-center'>
            <h2>Planes</h2>
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                label='Crear Plan'
                size='small'
                icon='pi pi-plus'
                iconPos='right'
                onClick={openCreatePromotion}
              />
              <Button
                label='Inscribir'
                size='small'
                icon='pi pi-plus-circle'
                iconPos='right'
                onClick={openCreateSubscription}
              />
            </HasRole>
          </div>
        )}
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='title'
          header='Nombre'
        />
        <Column
          field='amountWeeklyClasses'
          header='Veces x Semana'
        />
        <Column
          field='amountPrice'
          header='Precio'
        />
        <Column
          field='description'
          header='Descripción'
        />
        <Column
          body={(promotion) => (
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                label='Editar'
                size='small'
                icon='pi pi-pen-to-square'
                iconPos='right'
                outlined
                onClick={() => {
                  setSelectedPromotion(promotion)
                  openEditPromotion()
                }}
              />
            </HasRole>
          )}
        />
        <Column
          body={(promotion) => (
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                type='button'
                label='Ver Histórico'
                size='small'
                severity='success'
                icon='pi pi-info-circle'
                iconPos='right'
                outlined
                onClick={() => {
                  setSelectedPromotion(promotion)
                  openPromotionRecord()
                }}
              />
            </HasRole>
          )}
        />
        <Column
          body={(promotion) => (
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                label='Eliminar'
                size='small'
                icon='pi pi-trash'
                iconPos='right'
                severity='danger'
                outlined
                loading={isPending}
                onClick={() => {
                  setSelectedPromotion(promotion)
                  confirmDialog({
                    message: 'Confirmación de acción',
                    header: 'Eliminar promoción',
                    icon: 'pi pi-info-circle',
                    defaultFocus: 'reject',
                    acceptClassName: 'p-button-danger',
                    acceptLabel: 'Si',
                    accept: () => {
                      delPromotion(Number(promotion.id))
                    }
                  })
                }}
              />
            </HasRole>
          )}
        />
      </DataTable>
    </>
  )
}
