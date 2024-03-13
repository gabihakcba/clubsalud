'use client'

import React, { useState } from "react"
import { updateAccount, deleteAccount } from "queries/accounts"
import { Button } from "components/Buttons"
import { Account, CreateAccount, Permissions, UpdateAccount } from "utils/types"
import { calculatePages, APP } from "utils/const"
import { QueriesResponse } from "utils/types"
import { FieldValues, useForm } from "react-hook-form"

const deleteAccountB = async (id: number, accounts: Array<Account>, setAccounts: Function, setPages: Function, setIsOpen: Function): Promise<void> => {
  const response: QueriesResponse = await deleteAccount(id)
  if (response.status === 200) {
    const newAccounts: Array<Account> = [...accounts]
    const indexF: (e: Account) => boolean = (e: Account): boolean => Number(e.id) === Number(id)
    const index: number = newAccounts.findIndex(indexF)
    const deletedAccount: Array<Account> = newAccounts.splice(index, 1)
    setAccounts((odlAccunts: Array<Account>) => {
      setPages(calculatePages(odlAccunts.length - 1, APP))
      return newAccounts
    })
  }
  else {
    console.log('Client: error on deleteAccount')
  }
}

const update = async (id: number, setIsOpen: Function, setAccounts: Function, data: FieldValues, accounts: Array<Account>): Promise<void> => {
  const newAccount: UpdateAccount = {
    id: id,
    ...data as CreateAccount
  }

  const response: QueriesResponse = await updateAccount(newAccount)
  if (response.status === 200) {
    const newAccounts: Array<Account> = accounts.map(obj => {
      if (obj.id === response.data.id) {
        return newAccount;
      }
      return obj;
    });
    setAccounts(newAccounts)
    setIsOpen((prev: boolean) => !prev)
  }
  else {
    console.log('Client: error on updateAccount: ')
  }

}

export function UpdateDropdown({ account, setAccounts, accounts, setPages }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  return (
    <div className={'flex flex-col w-full'}>
      <Button onAction={() => setIsOpen(prev => !prev)} text='Actualizar' hover='hover:bg-yellow-500' bg=''></Button>
      {
        isOpen &&
        <form
          onSubmit={handleSubmit((data) => update(account.id, setIsOpen, setAccounts, data, accounts))}
          id="updateForm"
          className="w-full sm:w-max bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max absolute left-0 right-0 bottom-auto top-0 ml-auto mr-auto border-2 border-red-500">
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              {...register('username', {
                required: {
                  value: true,
                  message: 'Nombre de usuario requerido'
                }
              })}
              form="updateForm"
              defaultValue={account.username}
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder={account.username}>
            </input>
            {
              errors?.username &&
              <span className="inputError">{errors.username.message as string}</span>
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              {...register('password', {
                required: {
                  value: true,
                  message: 'Contraseña requerida'
                }
              })}
              form="updateForm"
              defaultValue={account.password}
              name="password"
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************">
            </input>
            {
              errors?.password &&
              <span className="inputError">{errors.password.message as string}</span>
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="repeatpassword">
              Repetir Contraseña
            </label>
            <input
              {...register('repeatpassword', {
                required: {
                  value: true,
                  message: 'Repetir contraseña es requerido'
                },
                validate: (value) => {
                  return watch('password') === value || 'Las contraseñas deben coincidir'
                }
              })}
              form="updateForm"
              defaultValue={account.password}
              name="repeatpassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="repeatpassword"
              type="password"
              placeholder="******************">
            </input>
            {
              errors?.repeatpassword &&
              <span className="inputError">{errors.repeatpassword.message as string}</span>
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="permisos">
              Permisos
            </label>
            <select
              {...register('permissions', {
                required: {
                  value: true,
                  message: 'Permisos es requerido'
                },
                validate: (value) => {
                  return value !== Permissions.OTHER || 'Debe seleccionar los permisos adecuados'
                }
              })}
              form="updateForm"
              name="permissions"
              id="permissions"
              defaultValue={Permissions.OTHER}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value={Permissions.OWN}>Propietario</option>
              <option value={Permissions.ADM}>Administrador</option>
              <option value={Permissions.INS}>Instructor</option>
              <option value={Permissions.MEM}>Alumno</option>
              <option value={Permissions.OTHER}>Otro</option>
            </select>
            {
              errors?.permissions &&
              <span className="inputError">{errors.permissions.message as string}</span>
            }
          </div>
          <div className="flex flex-col">
            <div className="flex items-stretch sm:items-center justify-between flex-col sm:flex-row">
              <button
                form="updateForm"
                className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Enviar
              </button>
              <button
                onClick={() => setIsOpen(prev => !prev)}
                className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Cancelar
              </button>
            </div>
            <button
              onClick={() => deleteAccountB(account.id, accounts, setAccounts, setPages, setIsOpen)}
              className='hover:bg-red-500 border border-red-500 flex flex-row rounded w-full p-2'
              type="button">
              Eliminar
            </button>
          </div>
        </form>
      }
    </div>
  )
}

UpdateDropdown.displayName = 'ChildComponent';