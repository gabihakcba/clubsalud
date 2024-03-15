'use client'

import { type ReactElement, useState } from 'react'
import { updateAccount, deleteAccount } from 'queries/accounts'
import { Button } from 'components/Buttons'
import {
  type Account,
  type CreateAccount,
  type Setter,
  type UpdateAccount,
  type QueriesResponse
} from 'utils/types'

import { Permissions } from 'utils/types'
import { calculatePages, APP } from 'utils/const'
import { type FieldValues, useForm } from 'react-hook-form'

const deleteAccountB = async (
  id: number,
  accounts: Account[],
  setAccounts: Setter,
  setPages: Setter,
  setIsOpen: Setter
): Promise<void> => {
  const response: QueriesResponse = await deleteAccount(id)
  if (response.status === 200) {
    const newAccounts: Account[] = [...accounts]
    const indexF: (e: Account) => boolean = (e: Account): boolean =>
      Number(e.id) === Number(id)
    const index: number = newAccounts.findIndex(indexF)
    const deletedAccount: Account[] = newAccounts.splice(index, 1)
    setIsOpen((prev: boolean) => !prev)
    setAccounts((odlAccunts: Account[]) => {
      setPages(calculatePages(odlAccunts.length - 1, APP))
      return newAccounts
    })
    console.log(deletedAccount)
  } else {
    console.log('Client: error on deleteAccount')
  }
}

const update = async (
  id: number,
  setIsOpen: Setter,
  setAccounts: Setter,
  data: FieldValues,
  accounts: Account[]
): Promise<void> => {
  const newAccount: UpdateAccount = {
    id,
    ...(data as CreateAccount)
  }

  const response: QueriesResponse = await updateAccount(newAccount)
  if (response.status === 200) {
    const newAccounts: Account[] = accounts.map((obj) => {
      if (obj.id === response.data.id) {
        return newAccount
      }
      return obj
    })
    setAccounts(newAccounts)
    setIsOpen((prev: boolean) => !prev)
  } else {
    console.log('Client: error on updateAccount: ')
  }
}

export function UpdateAccountDropdown({
  account,
  setAccounts,
  accounts,
  setPages
}: any): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  return (
    <div className={'flex flex-col w-full'}>
      <Button
        onAction={() => {
          setIsOpen((prev) => !prev)
        }}
        text='Actualizar'
        hover='hover:bg-yellow-500'
        bg=''
      ></Button>
      {isOpen && (
        <form
          onSubmit={handleSubmit((data) => {
            void update(
              account.id as number,
              setIsOpen,
              setAccounts as Setter,
              data,
              accounts as Account[]
            )
          })}
          id='updateForm'
          className='w-full sm:w-max bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 h-max absolute left-0 right-0 bottom-0 top-0 ml-auto mr-auto mb-auto mt-auto'
        >
          <div className='mb-4'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='username'
            >
              Nombre de Usuario
            </label>
            <input
              {...register('username', {
                required: {
                  value: true,
                  message: 'Nombre de usuario requerido'
                }
              })}
              form='updateForm'
              defaultValue={account.username}
              name='username'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder={account.username}
            ></input>
            {errors?.username && (
              <span className='inputError'>
                {errors.username.message as string}
              </span>
            )}
          </div>
          <div className='mb-6'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='password'
            >
              Contraseña
            </label>
            <input
              {...register('password', {
                required: {
                  value: true,
                  message: 'Contraseña requerida'
                }
              })}
              form='updateForm'
              defaultValue={account.password}
              name='password'
              className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
            ></input>
            {errors?.password && (
              <span className='inputError'>
                {errors.password.message as string}
              </span>
            )}
          </div>
          <div className='mb-6'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='repeatpassword'
            >
              Repetir Contraseña
            </label>
            <input
              {...register('repeatpassword', {
                required: {
                  value: true,
                  message: 'Repetir contraseña es requerido'
                },
                validate: (value) => {
                  return (
                    watch('password') === value ||
                    'Las contraseñas deben coincidir'
                  )
                }
              })}
              form='updateForm'
              defaultValue={account.password}
              name='repeatpassword'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='repeatpassword'
              type='password'
              placeholder='******************'
            ></input>
            {errors?.repeatpassword && (
              <span className='inputError'>
                {errors.repeatpassword.message as string}
              </span>
            )}
          </div>
          <div className='mb-6'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='permisos'
            >
              Permisos
            </label>
            <select
              {...register('permissions', {
                required: {
                  value: true,
                  message: 'Permisos es requerido'
                },
                validate: (value) => {
                  return (
                    value !== Permissions.OTHER ||
                    'Debe seleccionar los permisos adecuados'
                  )
                }
              })}
              form='updateForm'
              name='permissions'
              id='permissions'
              defaultValue={Permissions.OTHER}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value={Permissions.OWN}>Propietario</option>
              <option value={Permissions.ADM}>Administrador</option>
              <option value={Permissions.INS}>Instructor</option>
              <option value={Permissions.MEM}>Alumno</option>
              <option value={Permissions.OTHER}>Otro</option>
            </select>
            {errors?.permissions && (
              <span className='inputError'>
                {errors.permissions.message as string}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <div className='flex items-stretch sm:items-center justify-between flex-col sm:flex-row'>
              <button
                form='updateForm'
                className='mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Enviar
              </button>
              <button
                onClick={() => {
                  setIsOpen((prev) => !prev)
                }}
                className='mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Cancelar
              </button>
            </div>
            <button
              onClick={() => {
                void deleteAccountB(
                  account.id as number,
                  accounts as Account[],
                  setAccounts as Setter,
                  setPages as Setter,
                  setIsOpen
                )
              }}
              className='hover:bg-red-500 border border-red-500 flex flex-row rounded w-full p-2'
              type='button'
            >
              Eliminar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
