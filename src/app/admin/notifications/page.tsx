'use client'

import { useQuery } from '@tanstack/react-query'
import CreateNotificationForm from 'components/notifications/CreateNotificationForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { getAccountNotifications } from 'queries/notifications'
import { useState, type ReactElement, useEffect } from 'react'
import { type Notification, type Account } from 'utils/types'
import { useModal } from 'utils/useModal'

export default function NotificationsPage(): ReactElement {
  const [user, setUser] = useState<Account | null>(null)
  const [create, openCreate, closeCreate] = useModal(false)

  useEffect(() => {
    const user: Account = JSON.parse(localStorage.getItem('user') ?? '')
    setUser(user)
    void refetch()
  }, [])

  const { data: notifications, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<Notification[]> => {
      const user: Account = JSON.parse(localStorage.getItem('user') ?? '')
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
          (notification) => notification.receiverId === user?.id
        )}
        header='Recibidas'
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='receiver.username'
          header='De'
        />
        <Column
          field='sender.username'
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
          (notification) => notification.senderId === user?.id
        )}
        header='Enviadas'
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='receiver.username'
          header='De'
        />
        <Column
          field='sender.username'
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
