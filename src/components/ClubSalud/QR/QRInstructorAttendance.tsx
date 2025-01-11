import { type ReactElement } from 'react'
import QRCode from 'react-qr-code'

export default function AdminPage(): ReactElement {
  const url = 'localhost:3000/clubsalud/admin/qr-attendance'

  return (
    <div className='flex flex-column justify-content-center align-items-center'>
      <QRCode
        value={url}
        size={200}
      />
    </div>
  )
}
