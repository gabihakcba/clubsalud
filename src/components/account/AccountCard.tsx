'use client'
import { type ReactElement } from 'react'
import { type Account } from 'utils/types'
import { deleteAccount } from 'queries/accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from 'primereact/button'

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
    <div className='w-full flex flex-row p-2 align-items-center justify-content-between border-solid'>
      <div className='p-1 px-2'>{account.username}</div>
      <div className='flex justify-content-center align-items-center'>
        <div className='p-1 flex gap-2 px-2'>
          {account.permissions.map((permission, index) => (
            <p key={index}>{permission}</p>
          ))}
        </div>
        <Button
          onClick={() => {
            deleteF(Number(account.id))
          }}
          label='Eliminar'
          size='small'
          icon='pi pi-trash'
          severity='danger'
          className='p-1'
          outlined
        ></Button>
        <Button
          href={`/admin/info/${account.id}`}
          link
          severity='info'
          size='small'
        >
          Info
        </Button>
      </div>
    </div>
  )
}
export default AccountCard
