import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { type ReactElement } from 'react'
import CreateNote from './CreateNote'
import { useModal } from 'utils/ClubSalud/useModal'
import { getNotesReaded, getNotesUnreaded } from 'queries/ClubSalud/notes'
import NotesTable from './NotesTable'
import { getDataSessionClubSalud } from 'utils/ClubSalud/auth'

export default function NotesPage(): ReactElement {
  const [create, openCreate, closeCreate] = useModal(false)
  const [readed, openReaded, closeReaded] = useModal(false)

  const { data: userId, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const user = getDataSessionClubSalud().user.id
      return user
    }
  })

  const { data: notes, isLoading: isLoadingNotes } = useQuery({
    queryKey: ['unreadednotes'],
    queryFn: async () => {
      const response = await getNotesUnreaded()
      return response
    }
  })

  const { data: readedNotes, isLoading: isLoadingReadedNotes } = useQuery({
    queryKey: ['readednotes'],
    queryFn: async () => {
      const response = await getNotesReaded()
      return response
    }
  })

  return (
    <div className='flex flex-column gap-4'>
      <Dialog
        onHide={closeCreate}
        visible={create}
        header='Crear Nota'
      >
        <CreateNote accountId={userId} />
      </Dialog>
      <Dialog
        onHide={closeReaded}
        visible={readed}
      >
        <NotesTable
          notes={readedNotes ?? []}
          isLoading={isLoadingReadedNotes}
        ></NotesTable>
      </Dialog>
      <NotesTable
        notes={notes ?? []}
        isLoading={isLoadingNotes}
      />
      <Button
        label='Crear nota'
        size='small'
        outlined
        icon='pi pi-plus'
        iconPos='right'
        loading={isLoadingUser}
        onClick={openCreate}
      />
      <Button
        label='Ver leídos'
        size='small'
        outlined
        severity='success'
        icon='pi pi-eye'
        iconPos='right'
        onClick={openReaded}
      />
    </div>
  )
}
