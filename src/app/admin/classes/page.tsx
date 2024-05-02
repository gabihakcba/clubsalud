'use client'

import { useState, type ReactElement } from 'react'
import { useModal } from '../../../utils/useModal'
import CreateClassForm from 'components/classes/CreateClassForm'
import CreatePromotionForm from 'components/promotions/CreatePromotionForm'
import { type Class_, type Promotion } from 'utils/types'
import SubscriptionForm from 'components/subscriptions/SubscriptionForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteClass, getClasses } from 'queries/classes'
import { Column } from 'primereact/column'
import { deletePromotion, getPromotions } from 'queries/promotions'
import { Dialog } from 'primereact/dialog'
import ClassForm from 'components/classes/ClassForm'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import UpdatePromotionForm from 'components/promotions/UpdatePromotionForm'

export default function Classes(): ReactElement {
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [createClass, openCreateClass, closeCreateClass] = useModal(false)
  const [editClass, openEditClass, closeEditClass] = useModal(false)
  const [createPromotion, openCreatePromotion, closeCreatePromotion] =
    useModal(false)
  const [editPromotion, openEditPromotion, closeEditPromotion] = useModal(false)
  const [createSubscription, openCreateSubscription, closeCreateSubscription] =
    useModal(false)

  const query = useQueryClient()

  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await getClasses()
      return response.data
    }
  })

  const { data: promotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      const response = await getPromotions()
      return response
    }
  })

  const { mutate: delClass } = useMutation({
    mutationFn: async () => {
      return await deleteClass(Number(selectedClass.id))
    },
    async onSuccess(variables) {
      await query.setQueryData(['classes'], (oldData: Class_[]) => {
        const index = oldData.findIndex((class_: Class_) => {
          return class_.id === variables.data.id
        })
        const newData = [...oldData]
        newData.splice(index, 1)
        return newData
      })
    }
  })

  const { mutate: delPromotion, isPending } = useMutation({
    mutationFn: deletePromotion,
    onSuccess: async (variables) => {
      console.log(variables)
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
    <Card className='min-h-full flex flex-column'>
      <Dialog
        header='Crear Clase'
        visible={createClass}
        onHide={closeCreateClass}
      >
        <CreateClassForm />
      </Dialog>

      <Dialog
        header='Editar Clase'
        visible={editClass}
        onHide={closeEditClass}
      >
        <ClassForm class_={selectedClass} />
      </Dialog>

      <Dialog
        header='Crear Plan'
        visible={createPromotion}
        onHide={closeCreatePromotion}
      >
        <CreatePromotionForm />
      </Dialog>

      <Dialog
        header='Editar Plan'
        visible={editPromotion}
        onHide={closeEditPromotion}
      >
        <UpdatePromotionForm promotion={selectedPromotion} />
      </Dialog>

      <Dialog
        header='Inscripción'
        visible={createSubscription}
        onHide={closeCreateSubscription}
      >
        <SubscriptionForm />
      </Dialog>

      <ConfirmDialog />

      <DataTable
        value={classes}
        scrollable
        scrollHeight='35dvh'
        stripedRows
        selectionMode='single'
        selection={selectedClass}
        onSelectionChange={(e) => {
          setSelectedClass(e.value)
        }}
        header={() => (
          <div className='flex gap-4 align-items-center'>
            <h2>Clases</h2>
            <Button
              className='h-max'
              label='Crear Clase'
              size='small'
              icon='pi pi-plus'
              iconPos='right'
              onClick={openCreateClass}
            />
          </div>
        )}
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='name'
          header='Nombre'
        />
        <Column
          field='duration'
          header='Duración'
        />
        <Column
          body={(class_) => (
            <>
              <Button
                label='Editar'
                size='small'
                icon='pi pi-pen-to-square'
                iconPos='right'
                outlined
                onClick={() => {
                  setSelectedClass(class_)
                  openEditClass()
                }}
              />
            </>
          )}
        />
        <Column
          body={(class_) => (
            <>
              <Button
                label='Eliminar'
                size='small'
                icon='pi pi-trash'
                iconPos='right'
                severity='danger'
                outlined
                onClick={() => {
                  setSelectedClass(class_)
                  confirmDialog({
                    message: 'Confirmación de acción',
                    header: 'Eliminar clase',
                    icon: 'pi pi-info-circle',
                    defaultFocus: 'reject',
                    acceptClassName: 'p-button-danger',
                    acceptLabel: 'Si',
                    accept: () => {
                      delClass()
                    }
                  })
                }}
              />
            </>
          )}
        />
        <Column
          body={() => (
            <>
              <Button
                label='Información'
                size='small'
                icon='pi pi-info-circle'
                iconPos='right'
                link
                disabled
              />
            </>
          )}
        />
      </DataTable>

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
            <>
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
            </>
          )}
        />
        <Column
          body={(promotion) => (
            <>
              <Button
                label='Eliminar'
                size='small'
                icon='pi pi-trash'
                iconPos='right'
                severity='danger'
                outlined
                loading={isPending}
                onClick={() => {
                  console.log(promotion)
                  setSelectedClass(promotion)
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
            </>
          )}
        />
      </DataTable>
    </Card>
    // <div className='w-full flex flex-column align-items-start justify-content-start border-solid'>
    //   <div className='w-full flex align-items-center gap-4 border-solid'>
    //     <h2>Clases</h2>
    //     <HasRole required={[Permissions.ADM, Permissions.OWN]}>
    //       <Button
    //         label='Crear Clase'
    //         size='small'
    //         onClick={() => {
    //           openModal()
    //         }}
    //       />
    //       <Modal
    //         isOpen={isOpen}
    //         closeModal={closeModal}
    //       >
    //         <CreateClassForm closeModal={closeModal}></CreateClassForm>
    //       </Modal>
    //     </HasRole>
    //   </div>
    //   <section
    //     className='h-max w-full scrollHidden align-self-center p-4 border-solid'
    //     style={{
    //       display: 'grid',
    //       gridTemplateColumns: 'repeat(auto-fill, minmax(13rem,1fr))'
    //       // gap: '1rem',
    //       // alignContent: 'flex-start',
    //       // justifyItems: 'center',
    //       // width: '100%'
    //     }}
    //   >
    //     <ClassesCard />
    //   </section>
    //   <div className='w-full flex align-items-center gap-4'>
    //     <h2>Planes</h2>
    //     <HasRole required={[Permissions.ADM, Permissions.OWN]}>
    //       <Button
    //         label='Crear Oferta'
    //         onClick={() => {
    //           openModal()
    //         }}
    //         size='small'
    //       />
    //       <Modal
    //         isOpen={isOpen}
    //         closeModal={closeModal}
    //       >
    //         <CreatePromotionForm closeModal={closeModal}></CreatePromotionForm>
    //       </Modal>
    //       <Button
    //         type='button'
    //         label='Inscribir'
    //         onClick={openModalS}
    //         size='small'
    //       />
    //       <Modal
    //         isOpen={isOpenS}
    //         closeModal={closeModalS}
    //       >
    //         <SubscriptionForm closeModal={closeModalS}></SubscriptionForm>
    //       </Modal>
    //     </HasRole>
    //   </div>
    //   <PromotionSection></PromotionSection>
    // </div>
  )
}
