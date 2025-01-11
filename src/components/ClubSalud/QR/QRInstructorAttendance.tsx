import { type ReactElement } from 'react'
import QRCode from 'react-qr-code'

export default function AdminPage(): ReactElement {
  const url = `${process.env.NEXT_PUBLIC_NODE_PATH}/clubsalud/admin/qr-attendance`

  return (
    <div className='flex flex-column justify-content-center align-items-center'>
      <QRCode
        value={url}
        size={200}
      />
    </div>
  )
}
