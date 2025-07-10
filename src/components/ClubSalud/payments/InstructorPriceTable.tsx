import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag'
import {
  changeStateInstructorPrice,
  deleteInstructorPrice,
  getInstructorPrice
} from 'queries/ClubSalud/instructorPayments'
import { useState, type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import FormInstructorPrice from './FormInstructorPrice'
import { type InstructorPrice } from 'utils/ClubSalud/types'
import { DateUtils } from 'utils/ClubSalud/dates'

export function InstructorPriceTable(): ReactElement {
  const [createPrice, openPrice, closePrice] = useModal(false)
  const [selected, setSelected] = useState<number>(0)

  const query = useQueryClient()

  const { data: prices } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      return await getInstructorPrice()
    }
  })

  const { mutate: deletePrice, isPending: deleting } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteInstructorPrice(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['prices'] })
    }
  })

  const { mutate: changeStatePrice, isPending: changing } = useMutation({
    mutationFn: async (data: { id: number; state: boolean }) => {
      return await changeStateInstructorPrice(data.id, data.state)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['prices'] })
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
        selectionMode='single'
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
          field='active'
          header='Estado'
          sortable
          body={(e: InstructorPrice) => {
            return (
              <Tag severity={e.active ? 'success' : 'danger'}>
                {e.active ? 'Actual' : 'Histórico'}
              </Tag>
            )
          }}
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
                value={DateUtils.newDate(e.lastUpdate as Date)}
                disabled
              />
            )
          }}
          sortable
        />

        <Column
          body={(e) => {
            return (
              <Button
                label='Eliminar'
                icon='pi pi-trash'
                iconPos='right'
                size='small'
                severity='danger'
                outlined
                onClick={() => {
                  setSelected(e.id as number)
                  deletePrice(e.id as number)
                }}
                loading={deleting && (e.id as number) === selected}
              />
            )
          }}
        />

        <Column
          body={(e) => {
            return (
              <Button
                label='Cambiar estado'
                icon='pi pi-sync'
                iconPos='right'
                size='small'
                severity='warning'
                outlined
                onClick={() => {
                  setSelected(e.id as number)
                  changeStatePrice({
                    id: e.id as number,
                    state: e.active as boolean
                  })
                }}
                loading={changing && (e.id as number) === selected}
              />
            )
          }}
        />
      </DataTable>
    </>
  )
}
