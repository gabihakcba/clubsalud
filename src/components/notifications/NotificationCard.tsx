import { type ReactElement } from 'react'
import { type Notification } from 'utils/types'

interface params {
  notification: Notification
}
export default function NotificationCars({
  notification
}: params): ReactElement {
  return (
    <div className='flex flex-col border rounded p-2 gap-2'>
      <div className='flex gap-2'>
        <label htmlFor=''>De: </label>
        <p>{notification.sender.username}</p>
      </div>
      <hr />
      <div className='flex gap-2'>
        <label htmlFor=''>Para: </label>
        <p>{notification.receiver.username}</p>
      </div>
      <hr />
      <div className='flex gap-2'>
        <label htmlFor=''>Asunto: </label>
        <p>{notification.subject}</p>
      </div>
      <hr />
      <div className='flex flex-col gap-2'>
        <label htmlFor=''>Mensaje: </label>
        <p>{notification.body}</p>
      </div>
    </div>
  )
}
