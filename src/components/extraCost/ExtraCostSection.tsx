'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { deleteExtraCost, getExtraCost } from 'queries/extraCost'
import { useState, type ReactElement, useEffect } from 'react'
import { useModal } from 'utils/useModal'
import { Dialog } from 'primereact/dialog'
import ExtraCostForm from './ExtraCostForm'
import { Calendar } from 'primereact/calendar'
import { confirmDialog } from 'primereact/confirmdialog'
import { Tag } from 'primereact/tag'
import { type ExtraCost } from 'utils/types'

const getTotal = (payments: ExtraCost[], setTotal): void => {
  const total = payments.reduce(
    (acc: number, curr: ExtraCost) => acc + curr.amount,
    0
  )
  setTotal(total)
}

export default function ExtraCostSection(): ReactElement {
  const [total, setTotal] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const [createExtraCost, openCreateExtraCost, closeCreateExtraCost] =
    useModal(false)

  const { data: extracost, refetch } = useQuery({
    queryKey: ['extracost'],
    queryFn: async () => {
      return await getExtraCost()
    }
  })

  const { mutate: deleteExtra, isPending: deleting } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteExtraCost(id)
    },
    onSuccess: async () => {
      await refetch()
    }
  })

  useEffect(() => {
    if (extracost) {
      getTotal(extracost, setTotal)
    }
  }, [extracost])

  return (
    <>
      <Dialog
        visible={createExtraCost}
        onHide={closeCreateExtraCost}
        header='Agregar gasto extra'
      >
        <ExtraCostForm />
      </Dialog>
      <DataTable
        value={extracost}
        header={() => (
          <nav className='w-full flex align-items-center justify-content-between'>
            <Button
              label='Agegar gasto extra'
              size='small'
              icon='pi pi-plus'
              iconPos='right'
              onClick={openCreateExtraCost}
            />
            <Tag
              value={`Pagado: ${total}`}
              severity='success'
            />
          </nav>
        )}
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='amount'
          header='Cantidad'
        />
        <Column
          field='description'
          header='Descripción'
        />
        <Column
          field='date'
          header='Fecha'
          body={(e) => (
            <Calendar
              value={new Date(e.date as string)}
              disabled
            />
          )}
        />
        <Column
          body={(e) => (
            <Button
              label='Eliminar'
              icon='pi pi-trash'
              iconPos='right'
              size='small'
              outlined
              severity='danger'
              loading={deleting && selected === e.id}
              onClick={() => {
                setSelected(e.id as number)
                confirmDialog({
                  message: 'Quieres eliminar este gasto?',
                  header: 'Confirmación',
                  icon: 'pi pi-info-circle',
                  defaultFocus: 'reject',
                  acceptClassName: 'p-button-danger',
                  accept: () => {
                    deleteExtra(e.id as number)
                  }
                })
              }}
            />
          )}
        />
      </DataTable>
    </>
  )
}
