import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag'
import { getInstructorPrice } from 'queries/instructorPayments'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import FormInstructorPrice from './FormInstructorPrice'

export function InstructorTable(): ReactElement {
  const [createPrice, openPrice, closePrice] = useModal(false)

  const { data: prices } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      return await getInstructorPrice()
    }
  })

  return (
    <>
      <Dialog
        visible={createPrice}
        onHide={closePrice}
        header='Precios por hora'
      >
        <FormInstructorPrice />
      </Dialog>
      <DataTable
        header={() => {
          return (
            <div className='flex flex-row gap-4'>
              <Button
                label='Actualizar'
                size='small'
                icon='pi pi-pen-to-square'
                iconPos='right'
                onClick={openPrice}
              />
            </div>
          )
        }}
        value={prices}
        scrollable
        scrollHeight='20rem'
      >
        <Column
          field='id'
          header='ID'
          sortable
        />

        <Column
          field='amount'
          header='Pago por hora'
          sortable
        />
        <Column
          field='degree'
          header='Titulo'
          body={(e) => {
            return (
              <Tag severity={e.degree ? 'success' : 'danger'}>
                {e.degree ? 'SI' : 'NO'}
              </Tag>
            )
          }}
          sortable
        />

        <Column
          field='lastUpdate'
          header='Ultima actualización'
          body={(e) => {
            return (
              <Calendar
                value={new Date(e.lastUpdate as Date)}
                disabled
              />
            )
          }}
          sortable
        />
      </DataTable>
    </>
  )
}
