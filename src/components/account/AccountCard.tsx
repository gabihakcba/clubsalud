import { type ReactElement } from 'react'
import Image from 'next/image'
import delete_ from '../../../public/delete_.svg'
import edit from '../../../public/edit.svg'
import info from '../../../public/info.svg'
import {
  type Account,
  type QueriesResponse,
  type UpdateAccount,
  type Setter,
  type CreateAccount
} from 'utils/types'
import DropdownForm from 'components/DropdownForms'
import { CreateAccountForm } from './CreateAccountForm'
import Link from 'next/link'
import { APP, calculatePages } from 'utils/const'
import { deleteAccount, updateAccount } from 'queries/accounts'
import { type FieldValues } from 'react-hook-form'

const deleteA = async (
  id: number,
  accounts: Account[],
  setAccounts: Setter,
  setPages: Setter
): Promise<void> => {
  const response: QueriesResponse = await deleteAccount(id)
  if (response.status === 200) {
    const newAccounts: Account[] = [...accounts]
    const indexF: (e: Account) => boolean = (e: Account): boolean =>
      Number(e.id) === Number(id)
    const index: number = newAccounts.findIndex(indexF)
    const deletedAccount: Account[] = newAccounts.splice(index, 1)
    setAccounts((odlAccunts: Account[]) => {
      setPages(calculatePages(odlAccunts.length - 1, APP))
      return newAccounts
    })
    console.log(deletedAccount)
  } else {
    console.log('Client: error on deleteAccount')
  }
}

const updateA = async (
  id: number,
  data: FieldValues,
  setIsOpen: Setter,
  setAccounts: Setter
): Promise<void> => {
  console.log('Edit')
  const newAccount: UpdateAccount = {
    id,
    ...(data as CreateAccount)
  }
  const response: QueriesResponse = await updateAccount(newAccount)
  if (response.status === 200) {
    setAccounts((old: Account[]) => {
      const newAccounts: Account[] = old.map((acc: Account) => {
        if (acc.id === response.data.id) {
          return newAccount
        }
        return acc
      })
      return newAccounts
    })
    setIsOpen((prev: boolean) => !prev)
  } else {
    console.log(response.error)
    console.log('Client: error on updateAccount: ')
  }
}

interface params {
  account: Account
  setAccounts: Setter
  accounts: Account[]
  setPages: Setter
}

export default function AccountCard({
  account,
  setAccounts,
  accounts,
  setPages
}: params): ReactElement {
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
      <div className='flex flex-row w-max gap-0 px-4 justify-evenly items-center'>
        <div className='block hover:bg-yellow-600'>
          <DropdownForm
            position='static'
            top='top-0 bottom-0 left-0 right-0'
            left='ml-auto mr-auto mb-auto mt-auto'
            image={edit}
          >
            {(setIsOpen: Setter) => (
              <CreateAccountForm
                data={account}
                setIsOpen={setIsOpen}
                setAccounts={setAccounts}
                sendForm={updateA}
              ></CreateAccountForm>
            )}
          </DropdownForm>
        </div>
        <div className='block hover:bg-red-600'>
          <button
            onClick={() => {
              void deleteA(account.id, accounts, setAccounts, setPages)
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
        <div className='block'>
          <Link href={`/admin/accounts/${account.id}`}>
            <Image
              src={info}
              width={30}
              height={30}
              alt='I'
            ></Image>
          </Link>
        </div>
      </div>
    </div>
  )
}
