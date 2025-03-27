import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { changeStatusNotes } from 'queries/ClubSalud/notes'
import { useState, type ReactElement } from 'react'
import { argDate2Format } from 'utils/ClubSalud/dates'
import { type Notes } from 'utils/ClubSalud/types'

export default function NotesTable({
  notes,
  isLoading
}: {
  notes: Notes[]
  isLoading: boolean
}): ReactElement {
  const [selectedNote, setSelectedNote] = useState<number>(0)
  const query = useQueryClient()

  const { mutate: changeReaded, isPending } = useMutation({
    mutationFn: async (id: string | number) => {
      const response = await changeStatusNotes(id)
      return response
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['unreadednotes'] })
      await query.refetchQueries({ queryKey: ['readednotes'] })
    }
  })

  return (
    <DataTable
      value={notes}
      loading={isLoading}
      scrollHeight='40vh'
      scrollable
      emptyMessage='No hay notas'
    >
      <Column
        header='Titulo'
        field='title'
      />
      <Column
        header='Descripción'
        field='body'
      />
      <Column
        header='Fecha'
        body={(note: Notes) => {
          return <div>{argDate2Format(note.date)}</div>
        }}
      />
      <Column
        header=''
        body={(note: Notes) => {
          return (
            <Button
              label={`Marcar como ${note.readed ? 'no leído' : 'leído'}`}
              size='small'
              severity={note.readed ? 'warning' : 'success'}
              outlined
              onClick={() => {
                changeReaded(note.id)
                setSelectedNote(note.id)
              }}
              icon='pi pi-check'
              iconPos='right'
              loading={selectedNote === note.id && isPending}
            />
          )
        }}
      />
    </DataTable>
  )
}
