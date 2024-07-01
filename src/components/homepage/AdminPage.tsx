import { useQuery } from '@tanstack/react-query'
import AttendanceForm from 'components/attendance/AttendanceForm'
import CreateNotificationForm from 'components/notifications/CreateNotificationForm'
import MemberSubsTable from 'components/subscriptions/MemberSubsTable'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { getOrderedSubscriptions } from 'queries/subscriptions'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function AdminPage(): ReactElement {
  const [showAttendance, openAttendance, closeAttendace] = useModal(false)
  const [create, openCreate, closeCreate] = useModal(false)

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const mems = await getOrderedSubscriptions()
      return mems
    }
  })

  return (
    <div className='flex flex-column'>
      <Dialog
        visible={showAttendance}
        onHide={closeAttendace}
        header='Asistencia'
      >
        <AttendanceForm />
      </Dialog>
      <Dialog
        visible={create}
        onHide={closeCreate}
        header='Crear Notificación'
      >
        <CreateNotificationForm />
      </Dialog>
      <nav className='flex justify-content-end gap-4'>
        <Button
          label='Cargar asistencia'
          size='small'
          outlined
          icon='pi pi-plus'
          iconPos='right'
          onClick={openAttendance}
        />
        <Button
          label='Crear Notificación'
          size='small'
          outlined
          icon='pi pi-plus'
          iconPos='right'
          onClick={openCreate}
        />
      </nav>
      <main>
        <MemberSubsTable members={members} />
      </main>
    </div>
  )
}
