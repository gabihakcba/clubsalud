import { useMutation, useQuery } from '@tanstack/react-query'
import HasRole from 'components/ClubSalud/HasRole'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { deletePlan, getPlan } from 'queries/ClubSalud/plan'
import { useState, type ReactElement } from 'react'
import { Permissions, type Plan } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import { CreateOfferForm } from './CreateOfferForm'
import { EditOfferForm } from './EditOfferForm'

export default function OffersTable(): ReactElement {
  const [selectedOffer, setSelectedOffer] = useState<Plan | null>(null)
  const [createOffer, openCreateOffer, closeCreateOffer] = useModal(false)
  const [editOffer, openEditOffer, closeEditOffer] = useModal(false)

  const { data: offers, refetch } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const data = await getPlan()
      return data
    }
  })

  const { mutate: deleteOffer, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await deletePlan(id)
    },
    onSuccess: async () => {
      await refetch()
    }
  })

  return (
    <>
      <Dialog
        header='Crear Oferta'
        visible={createOffer}
        onHide={closeCreateOffer}
      >
        <CreateOfferForm/>
      </Dialog>

      <Dialog
        header='Editar Oferta'
        visible={editOffer}
        onHide={closeEditOffer}
      >
        <EditOfferForm offer={selectedOffer}/>
      </Dialog>

      <DataTable
        value={offers}
        scrollable
        scrollHeight='35dvh'
        stripedRows
        selectionMode='single'
        selection={selectedOffer}
        onSelectionChange={(e) => {
          setSelectedOffer(e.value as Plan)
        }}
        header={() => (
          <div className='flex gap-4 align-items-center'>
            <h2>Ofertas</h2>
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                label='Crear Oferta'
                size='small'
                icon='pi pi-plus'
                iconPos='right'
                onClick={openCreateOffer}
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
            field='description'
            header='Descripción'
          />
        <Column
          field='durationMonth'
          header='Meses'
        />
        <Column
          field='discountPercent'
          header='Descuento'
        />
        <Column
          body={(offer) => (
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                label='Editar'
                size='small'
                icon='pi pi-pen-to-square'
                iconPos='right'
                outlined
                onClick={() => {
                  setSelectedOffer(offer as Plan)
                  openEditOffer()
                }}
              />
            </HasRole>
          )}
        />
        <Column
          body={(offer) => (
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                label='Eliminar'
                size='small'
                icon='pi pi-trash'
                iconPos='right'
                severity='danger'
                outlined
                loading={isPending && selectedOffer?.id === offer.id}
                onClick={() => {
                  setSelectedOffer(offer as Plan)
                  confirmDialog({
                    message: 'Confirmación de acción',
                    header: 'Eliminar plan',
                    icon: 'pi pi-info-circle',
                    defaultFocus: 'reject',
                    acceptClassName: 'p-button-danger',
                    acceptLabel: 'Si',
                    accept: () => {
                      deleteOffer(Number(offer.id))
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
