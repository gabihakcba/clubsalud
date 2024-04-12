import Link from 'next/link'
import { type ReactElement } from 'react'
import { type Account } from 'utils/types'

interface params {
  account: Account | undefined
}
export default function AccountInfo({ account }: params): ReactElement {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2 justify-between'>
        <label>Usuario: </label>
        <p>{account?.username}</p>
      </div>
      <div className='flex gap-2 justify-between'>
        <label>Permisos: </label>
        <p>{account?.permissions}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <hr />
        Perfiles asociados
        {account?.memberAccount && (
          <Link href={`/admin/info/member/${account.id}`}>
            {account.memberAccount.name}
          </Link>
        )}
        {account?.instructorAccount && (
          <Link href={`/admin/info/account/${account.id}`}>
            {account.instructorAccount.name}
          </Link>
        )}
        <hr />
      </div>
    </div>
  )
}
