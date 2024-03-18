'use client'
import { type ReactElement } from 'react'
import Image from 'next/image'
import delete_ from '../../../public/delete_.svg'
import edit from '../../../public/edit.svg'
import { type Account } from 'utils/types'
import { CreateAccountForm } from './CreateAccountForm'
import { deleteAccount } from 'queries/accounts'
import { useModal } from 'utils/useModal'
import Modal from 'components/Modal'
import InfoButton from 'components/InfoButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteA = async (info: { id: number }): Promise<Account> => {
  const response = await deleteAccount(info.id)
  return response.data
}

interface params {
  account: Account
  accounts: Account[]
}

function AccountCard({ account, accounts }: params): ReactElement {
  const [editM, openEdit, closeEdit] = useModal(false)
  const query = useQueryClient()
  const { mutate: mutateD } = useMutation({
    mutationFn: deleteA,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['acc'] })
    }
  })

  return (
    <div className='bg-white shadow-md rounded p-3 mb-5 h-max w-min'>
      <div className='mb-2'>
        <input
          name='name'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder={`${account.username}`}
          disabled
        ></input>
      </div>
      <div className='mb-2'>
        <input
          name='permissions'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          type='password'
          placeholder={`${account.permissions}`}
          disabled
        ></input>
      </div>
      <div className='flex flex-row w-max gap-2 justify-around items-stretch'>
        <div className='block hover:bg-yellow-600'>
          <button onClick={openEdit}>
            <Image
              src={edit}
              width={30}
              height={30}
              alt='E'
            ></Image>
          </button>
          <Modal
            isOpen={editM}
            closeModal={closeEdit}
          >
            <CreateAccountForm
              data={account}
              closeModal={closeEdit}
            ></CreateAccountForm>
          </Modal>
        </div>
        <div className='block hover:bg-red-600'>
          <button
            onClick={() => {
              mutateD({ id: account.id })
            }}
          >
            <Image
              src={delete_}
              width={30}
              height={30}
              alt=''
            ></Image>
          </button>
        </div>
        <InfoButton
          id={account.id}
          permissions={account.permissions}
        ></InfoButton>
      </div>
    </div>
  )
}
export default AccountCard
