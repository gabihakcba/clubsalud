import DropdownForm from 'components/DropdownForms'
import { type ReactElement } from 'react'
import {
  type Account,
  type CreateAccount,
  Permissions,
  type QueriesResponse,
  type Setter
} from 'utils/types'
import menu from '../../../public/menu.svg'
import create from '../../../public/createa.svg'
import update from '../../../public/update.svg'
import Image from 'next/image'
import { CreateAccountForm } from './CreateAccountForm'
import { createAccount, getAccounts } from 'queries/accounts'
import { type FieldValues } from 'react-hook-form'
import { APP, calculatePages } from 'utils/const'

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

interface params {
  setAccounts: Setter
  setPages: Setter
  setFilterName: Setter
  setFilterPermissions: Setter
}
export default function AccountTopbar({
  setAccounts,
  setPages,
  setFilterName,
  setFilterPermissions
}: params): ReactElement {
  return (
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
  )
}
