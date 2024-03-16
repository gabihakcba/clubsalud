'use client'

import AccountsPaginationBar from 'components/account/AccountsPaginationBar'
import { type ReactElement, useEffect, useState } from 'react'
import {
  createAccount,
  deleteAccount,
  getAccounts,
  getTotalPagesA,
  updateAccount
} from 'queries/accounts'
import { APP, calculatePages } from 'utils/const'
import {
  type QueriesResponse,
  type Account,
  type Limits,
  Permissions,
  type Setter,
  type CreateAccount,
  type UpdateAccount
} from 'utils/types'
import DropdownForm from 'components/DropdownForms'
import { CreateAccountForm } from 'components/account/CreateAccountForm'
import Image from 'next/image'
import create from '../../../../public/createa.svg'
import update from '../../../../public/update.svg'
import menu from '../../../../public/menu.svg'
import edit from '../../../../public/edit.svg'
import delete_ from '../../../../public/delete_.svg'
import { type FieldValues } from 'react-hook-form'
import Link from 'next/link'

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

const createA = async (
  data: FieldValues,
  setIsOpen: Setter,
  setAccounts: Setter,
  setPages: Setter
): Promise<void> => {
  console.log('Create')
  const newUser: CreateAccount = data as CreateAccount

  const response = await createAccount(newUser)
  if (response.status === 200) {
    setIsOpen((isOpen: boolean) => !isOpen)
    setAccounts((prevAccounts: Account[]) => {
      setPages(calculatePages(prevAccounts.length + 1, APP))
      return [...prevAccounts, response.data]
    })
  } else {
    console.log('Client: error on createAccount')
  }
}

const setAccountsElems = async (
  setAccounts: Setter,
  page: number = 0
): Promise<void> => {
  const response: QueriesResponse = await getAccounts(page)
  if (response.status === 200) {
    setAccounts(response.data)
  } else {
    console.log('Client: error on getAccounts')
  }
}

const getPages = async (setPages: Setter): Promise<void> => {
  const response: QueriesResponse = await getTotalPagesA()
  if (response.status === 200) {
    setPages(response.data)
  } else {
    console.log('Client: error on getTotalPagesA')
  }
}

export default function Accounts(): ReactElement {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [pages, setPages] = useState<number>(1)
  const [filterName, setFilterName] = useState<string>('')
  const [filterPermissions, setFilterPermissions] = useState<Permissions | ''>(
    ''
  )
  const [limits, setLimits] = useState<Limits>({ start: 0, end: APP })

  useEffect(() => {
    void setAccountsElems(setAccounts)
    void getPages(setPages)
  }, [])

  return (
    <div className='max-h-dvh h-full w-full flex items-start justify-start flex-row'>
      <main className='mr-5 w-full h-full flex flex-col items-start justify-between'>
        <div className='w-full h-max p-2 bg-white border-b-2 border-gray-400'>
          <DropdownForm
            position='relative'
            top='top-8 md:top-0'
            left='left-1 md:left-10'
            image={menu}
          >
            {(action: Setter) => (
              <div className='pt-2 flex flex-col md:flex-row md:items-center md:pt-0 gap-4 bg-white md:shadow-none shadow rounded '>
                <div className='flex gap-5 justify-evenly md:justify-center flex-row'>
                  <DropdownForm
                    position='static md:relative'
                    top='top-0'
                    left='left-0'
                    image={create}
                  >
                    {(setIsOpen: Setter) => (
                      <CreateAccountForm
                        setAccounts={setAccounts}
                        setPages={setPages}
                        setIsOpen={setIsOpen}
                        sendForm={createA}
                      ></CreateAccountForm>
                    )}
                  </DropdownForm>
                  <button
                    onClick={() => {
                      void setAccountsElems(setAccounts)
                    }}
                    className=''
                    type='button'
                  >
                    <Image
                      alt=''
                      src={update}
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
                <input
                  onChange={(e) => {
                    setFilterName(e.target.value)
                  }}
                  autoComplete='off'
                  defaultValue={''}
                  name='password'
                  className='p-2 mx-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                  placeholder={'Nombre de usuario'}
                ></input>
                <select
                  onChange={(e) => {
                    setFilterPermissions(e.target.value as Permissions)
                  }}
                  name='permissions'
                  id='permissions'
                  className='p-2 mx-4 mb-4 md:mb-0 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                >
                  <option value={Permissions.OWN}>Propietario</option>
                  <option value={Permissions.ADM}>Administrador</option>
                  <option value={Permissions.INS}>Instructor</option>
                  <option value={Permissions.MEM}>Alumno</option>
                  <option value={Permissions.OTHER}>Otros</option>
                  <option
                    value=''
                    selected
                  >
                    Sin filtro
                  </option>
                </select>
              </div>
            )}
          </DropdownForm>
        </div>
        <section
          className='mt-5 ml-5 h-full'
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(9rem,1fr))',
            gap: '0,5rem',
            alignContent: 'flex-start',
            maxHeight: '95dvh',
            overflow: 'scroll'
          }}
        >
          {accounts
            .filter((account) =>
              account.permissions.includes(filterPermissions)
            )
            .filter((account) =>
              account.username.toLowerCase().includes(filterName.toLowerCase())
            )
            .slice(limits.start, limits.end)
            .map((account, index) => (
              <Link
                href={`/admin/accounts/${account.id}`}
                key={Math.random()}
                className=''
                style={{
                  justifySelf: 'center'
                  // 'border': '1px solid red'
                }}
              >
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
                  <div className='flex flex-row w-max gap-2 px-4 justify-evenly items-center'>
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
                          void deleteA(
                            account.id,
                            accounts,
                            setAccounts,
                            setPages
                          )
                        }}
                      >
                        <Image
                          src={delete_}
                          width={35}
                          height={35}
                          alt=''
                        ></Image>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </section>
        <nav className='w-full'>
          <AccountsPaginationBar
            pagesNumber={pages}
            setLimits={setLimits}
          ></AccountsPaginationBar>
        </nav>
      </main>
    </div>
  )
}
