'use client'

import { useQuery } from '@tanstack/react-query'
import HasRole from 'components/HasRole'
import Modal from 'components/Modal'
import CreateNotificationForm from 'components/notifications/CreateNotificationForm'
import NotificationSection from 'components/notifications/NotificationSection'
import { getAllNotifications } from 'queries/notifications'
import { type ReactElement } from 'react'
import { type Notification, Permissions } from 'utils/types'
import { useModal } from 'utils/useModal'

export default function NotificationsPage(): ReactElement {
  const [create, openCreate, closeCreate] = useModal(false)

  const { data: notifications } = useQuery({
    queryKey: ['notificationes'],
    queryFn: async (): Promise<Notification[]> => {
      return await getAllNotifications()
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
      <NotificationSection notifications={notifications}></NotificationSection>
    </div>
  )
}
