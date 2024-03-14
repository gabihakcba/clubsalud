'use client'

import { CreateDropdown } from 'components/account/CreateDropdown'
import AccountsPaginationBar from 'components/account/AccountsPaginationBar'
import { type ReactElement, useEffect, useState } from 'react'
import { getAccounts, getTotalPagesA } from 'queries/accounts'
import { APP } from 'utils/const'
import { Menu } from 'asserts/svgs/Menu'
import {
  type Account,
  type Limits,
  type Setter,
  type QueriesResponse
} from 'utils/types'
import { Permissions } from 'utils/types'
// import { Info } from 'components/info'

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

export default function People(): ReactElement {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [pages, setPages] = useState<number>(1)
  const [drop, setDrop] = useState<boolean>(true)
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
        <div className='flex flex-col bg-white md:bg-transparent md:flex-row w-full m-2  content-center'>
          <button
            onClick={() => {
              setDrop((prev) => !prev)
            }}
            className='mx-2 h-auto py-2'
          >
            <Menu></Menu>
          </button>
          {drop && (
            <div className='flex flex-col absolute top-16 left-4 w-max bg-white md:bg-transparent md:top-auto md:left-auto md:relative md:flex-row md:w-full'>
              <CreateDropdown
                setAccounts={setAccounts}
                setPages={setPages}
              ></CreateDropdown>
              <button
                onClick={() => {
                  void setAccountsElems(setAccounts)
                }}
                className='w-full mb-5 md:m-2 md:w-max md:mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Actualizar
              </button>
              <input
                onChange={(e) => {
                  setFilterName(e.target.value)
                }}
                autoComplete='off'
                defaultValue={''}
                name='password'
                className='w-full mb-5 md:m-2 md:w-max md:mr-5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                className='w-full mb-5 md:m-2 md:w-max md:mr-5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
              <section
                key={index}
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
                  <div className='flex flex-row'>
                    {/* <Info
                      account={account}
                      setAccounts={setAccounts}
                      accounts={accounts}
                      setPages={setPages}
                    ></Info> */}
                  </div>
                </div>
              </section>
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
