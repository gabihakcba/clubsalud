import { type ReactElement } from 'react'
import { type Notification } from 'utils/types'
import NotificationCard from './NotificationCard'

interface params {
  notifications: Notification[] | undefined
}
export default function NotificationSection({
  notifications
}: params): ReactElement {
  return (
    <section
      className='mt-5 ml-5 h-full'
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(12rem,1fr))',
        gap: '1rem',
        alignContent: 'flex-start'
      }}
    >
      {notifications?.map((notification, index) => (
        <NotificationCard
          notification={notification}
          key={index}
        ></NotificationCard>
      ))}
    </section>
  )
}
