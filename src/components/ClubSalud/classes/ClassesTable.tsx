import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import HasRole from 'components/ClubSalud/HasRole'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { deleteClass, getClasses } from 'queries/ClubSalud/classes'
import { useState, type ReactElement } from 'react'
import { Permissions, type Class_ } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import ClassForm from './ClassForm'
import CreateClassForm from './CreateClassForm'

export default function ClassesTable(): ReactElement {
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [editClass, openEditClass, closeEditClass] = useModal(false)
  const [createClass, openCreateClass, closeCreateClass] = useModal(false)

  const query = useQueryClient()

  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      return await getClasses()
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

  return (
    <>
      <Dialog
        header='Editar Clase'
        visible={editClass}
        onHide={closeEditClass}
      >
        <ClassForm class_={selectedClass} />
      </Dialog>

      <Dialog
        header='Crear Clase'
        visible={createClass}
        onHide={closeCreateClass}
      >
        <CreateClassForm />
      </Dialog>

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
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
              <Button
                className='h-max'
                label='Crear Clase'
                size='small'
                icon='pi pi-plus'
                iconPos='right'
                onClick={openCreateClass}
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
          field='name'
          header='Nombre'
        />
        <Column
          field='duration'
          header='Duración'
        />
        <Column
          body={(class_) => (
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
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
            </HasRole>
          )}
        />
        <Column
          body={(class_) => (
            <HasRole required={[Permissions.ADM, Permissions.OWN]}>
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
            </HasRole>
          )}
        />
        <Column
          body={() => (
            <Button
              label='Información'
              size='small'
              icon='pi pi-info-circle'
              iconPos='right'
              link
              disabled
            />
          )}
        />
      </DataTable>
    </>
  )
}
