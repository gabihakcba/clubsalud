'use client'
import { type ReactElement } from 'react'
import { type Account } from 'utils/types'
import { deleteAccount } from 'queries/accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

interface params {
  account: Account
}
function AccountCard({ account }: params): ReactElement {
  const query = useQueryClient()

  const { mutate: deleteF } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteAccount(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['acc'] })
    }
  })

  return (
    <div className='bg-white shadow-md rounded flex flex-col p-2 items-center'>
      <div className='p-1 px-2'>{account.username}</div>
      <div className='p-1'>{account.permissions}</div>
      <div className='flex justify-center items-center gap-2'>
        <button
          className='light-red-border-button'
          onClick={() => {
            deleteF(Number(account.id))
          }}
        >
          Eliminar
        </button>
        <Link
          href={`/admin/info/${account.id}`}
          className='light-blue-border-button'
        >
          Info
        </Link>
      </div>
    </div>
  )
}
export default AccountCard
