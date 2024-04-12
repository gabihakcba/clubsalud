'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Modal from 'components/Modal'
import AccountInfo from 'components/account/AccountInfo'
import { CreateAccountForm } from 'components/account/CreateAccountForm'
import { useRouter } from 'next/navigation'
import { deleteAccount, getAccountById } from 'queries/accounts'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

interface params {
  params: {
    id: string
  }
}
export default function AccountPage({ params }: params): ReactElement {
  const router = useRouter()
  const query = useQueryClient()
  const [isOpenEdit, openEdit, closeEdit] = useModal(false)

  const { mutate: delete_ } = useMutation({
    mutationFn: async (id: number) => {
      await deleteAccount(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['acc'] })
      router.push('/admin/accounts')
    }
  })

  const { data: account } = useQuery({
    queryKey: ['account', params.id],
    queryFn: async () => {
      return await getAccountById(params.id)
    }
  })

  return (
    <div className='h-full w-full flex justify-center items-center'>
      {account && (
        <div className='w-full h-full p-6 flex flex-col gap-5'>
          <AccountInfo account={account}></AccountInfo>
          <div className='flex gap-4'>
            <button
              className='light-blue-border-button'
              onClick={openEdit}
            >
              Editar
            </button>
            <button
              className='light-red-border-button'
              onClick={async () => {
                delete_(Number(params.id))
              }}
            >
              Eliminar
            </button>
          </div>
          <Modal
            isOpen={isOpenEdit}
            closeModal={closeEdit}
          >
            <CreateAccountForm
              account={account}
              closeModal={closeEdit}
            ></CreateAccountForm>
          </Modal>
        </div>
      )}
    </div>
  )
}
