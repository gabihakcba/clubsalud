'use client'

import { useQuery } from '@tanstack/react-query'
import HasRole from 'components/HasRole'
import Modal from 'components/Modal'
import CreateNotificationForm from 'components/notifications/CreateNotificationForm'
import NotificationSection from 'components/notifications/NotificationSection'
import { getAccountNotifications } from 'queries/notifications'
import { useState, type ReactElement, useEffect } from 'react'
import { type Notification, Permissions, type Account } from 'utils/types'
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
    queryKey: ['notificationes'],
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
    <div className='flex flex-col'>
      <div className='flex gap-2 items-center'>
        <h2 className='text-2xl font-bold m-2'>Notificaciones</h2>
        <HasRole required={[Permissions.ADM, Permissions.OWN]}>
          <button
            className='blueButtonForm w-max h-max p-1'
            onClick={openCreate}
          >
            Crear notificacion
          </button>
          <Modal
            isOpen={create}
            closeModal={closeCreate}
          >
            <CreateNotificationForm
              closeModal={closeCreate}
            ></CreateNotificationForm>
          </Modal>
        </HasRole>
      </div>

      <hr className='m-2' />
      <h3>Recibidas</h3>
      <hr className='m-2' />
      <NotificationSection
        notifications={notifications?.filter(
          (notification) => notification.receiverId === user?.id
        )}
      ></NotificationSection>

      <hr className='m-2' />
      <h3>Enviadas</h3>
      <hr className='m-2' />
      <NotificationSection
        notifications={notifications?.filter(
          (notification) => notification.senderId === user?.id
        )}
      ></NotificationSection>
    </div>
  )
}
