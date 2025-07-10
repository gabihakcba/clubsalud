'use client'

import { useQuery } from '@tanstack/react-query'
import CreateNotificationForm from 'components/ClubSalud/notifications/CreateNotificationForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { getAccountNotifications } from 'queries/ClubSalud/notifications'
import { useState, type ReactElement } from 'react'
import { type Notification, type Account } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'

export default function NotificationsPage(): ReactElement {
  const [create, openCreate, closeCreate] = useModal(false)
  const [currentUser, setCurrentUser] = useState<Account | null>(null)

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<Notification[]> => {
      const storage = localStorage.getItem('user')
      if (!storage) return []
      const user: Account = JSON.parse(storage)
      setCurrentUser(user)
      if (user?.id) {
        const not = await getAccountNotifications(user.id)
        return not
      }
      return []
    }
  })

  return (
    <Card className='flex flex-column h-full'>
      <nav className='flex gap-4 align-items-center'>
        <h2>Notificaciones</h2>
        <Button
          label='Crear Notificación'
          onClick={openCreate}
          size='small'
          icon='pi pi-plus'
          iconPos='right'
        />
        <Dialog
          visible={create}
          onHide={closeCreate}
          header='Crear Notificación'
        >
          <CreateNotificationForm />
        </Dialog>
      </nav>

      <DataTable
        value={notifications?.filter(
          (notification) => notification.receiverId === currentUser?.id
        )}
        header='Recibidas'
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='Sender.username'
          header='De'
        />
        <Column
          field='Receiver.username'
          header='Para'
        />
        <Column
          field='subject'
          header='Encabezado'
        />
        <Column
          field='body'
          header='Mensaje'
        />
      </DataTable>

      <DataTable
        value={notifications?.filter(
          (notification) => notification.senderId === currentUser?.id
        )}
        header='Enviadas'
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          body={(data: Notification) => {
            return (
              data.Sender?.Member?.name ??
              data.Sender?.Instructor?.name ??
              data.Sender?.Employee?.name ??
              data.Sender.username
            )
          }}
          header='De'
        />
        <Column
          body={(data) => {
            return (
              data.Receiver?.instructorAccount?.name ??
              data.Receiver?.memberAccount?.name ??
              data.Receiver?.employeeAccount?.name ??
              data.Receiver.username
            )
          }}
          header='Para'
        />
        <Column
          field='subject'
          header='Encabezado'
        />
        <Column
          field='body'
          header='Mensaje'
        />
      </DataTable>
    </Card>
  )
}
