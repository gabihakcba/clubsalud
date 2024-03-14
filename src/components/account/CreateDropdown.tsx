'use client'

import { useState } from "react"
import { createAccount } from "queries/accounts"
import { Account, CreateAccount, Permissions } from "utils/types"
import { calculatePages } from "utils/const"
import { APP } from "utils/const"
import { FieldValues, useForm } from "react-hook-form"

const create = async (data: FieldValues, setIsOpen: Function, setAccounts: Function, setPages: Function): Promise<void> => {
  const newUser: CreateAccount = data as CreateAccount

  const response = await createAccount(newUser)
  if (response.status === 200) {
    setIsOpen((isOpen: boolean) => !isOpen)
    setAccounts((prevAccounts: Array<Account>) => {
      setPages(calculatePages(prevAccounts.length + 1, APP))
      return [...prevAccounts, response.data]
    })
  }
  else {
    console.log('Client: error on createAccount')
  }
}

export function CreateDropdown({ setAccounts, setPages }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  return (
    <div className={'flex flex-col w-full mb-5 md:m-2 md:w-max md:mr-5'}>
      {
        !isOpen &&
        <button onClick={() => setIsOpen(prev => !prev)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Crear Cuenta
        </button>
      }
      {
        isOpen &&
        <form
          onSubmit={handleSubmit((data) => create(data, setIsOpen, setAccounts, setPages))}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max absolute"
          id='createForm'>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              {...register('username', {
                required: {
                  value: true,
                  message: 'El nombre de usuario es requerido'
                }
              })}
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              form="createForm"
              type="text"
              autoComplete="off"
              placeholder="Nombre de usuario">
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
                  message: 'La contraseña es requerida'
                }
              })}
              name="password"
              id="password"
              form="createForm"
              type="password"
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                  message: 'Confirmar la contraseña es requerido'
                },
                validate: (value) => {
                  return watch('password') === value ||
                    'Las contraseñas deben coincidir'
                }
              })}
              name="repeatpassword"
              id="repeatpassword"
              form="createForm"
              type="password"
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                  message: 'Los permisos son requeridos'
                },
                validate: (value) => {
                  return value !== 'OTHER' || 'Debe seleccionar los permisos adecuados'
                }
              })}
              name="permissions"
              id="permissions"
              form="createForm"
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
            <div className="flex items-stretch justify-between flex-col sm:flex-row sm:items-center">
              <button
                form="createForm"
                className="mb-2 sm:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Crear
              </button>
              <button
                onClick={() => setIsOpen(prev => !prev)}
                className="mb-2 sm:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                type="button">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      }
    </div>
  )
}