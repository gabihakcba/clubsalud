'use client'

import { ChangeEvent, useState } from "react"
import { createAccount } from "queries/accounts"
import { Account, CreateAccount, Permissions } from "utils/types"
import { calculatePages } from "utils/const"
import { APP } from "utils/const"

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, setData: Function): void => {
  setData((data: CreateAccount) => {
    return {
      ...data,
      [e.target.id]: e.target.value
    }
  })
}

const create = async (data: CreateAccount, setIsOpen: Function, setAccounts: Function, setPages: Function): Promise<void> => {
  if (data.password !== data.repeatpassword) {
    alert('Las contraseñas deben coincidir')
  }
  else if (data.permissions === Permissions.OTHER) {
    alert('Selecciones los permisos adecuados')
  }
  else {
    const response = await createAccount(data)
    if (response.status === 200) {
      setIsOpen((isOpen: boolean) => !isOpen)
      setAccounts((prevAccounts: Array<Account>) => {
        setPages(calculatePages(prevAccounts.length+1, APP))
        return [...prevAccounts, response.data]
      })
    }
    else {
      console.log('Client: error on createAccount')
    }
  }
}

export function CreateDropdown({ setAccounts, setPages }) {
  const [isOpen, setIsOpen] = useState <boolean>(false)
  const [data, setData] = useState <CreateAccount>({
    username: '',
    password: '',
    repeatpassword: '',
    permissions: Permissions.OTHER
  })
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
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max absolute">
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="username">
              Nombre de Usuario
            </label>
            <input name="password" onChange={(e) => handleChange(e, setData)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="permisos">
              Permisos
            </label>
            <select onChange={(e) => handleChange(e, setData)} name="permissions" id="permissions" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="OWN">Propietario</option>
              <option value="ADM">Administrador</option>
              <option value="INS">Instructor</option>
              <option value="MEM">Alumno</option>
              <option value="OTHER" selected>Otro</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input name="password" onChange={(e) => handleChange(e, setData)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="repeatpassword">
              Repetir Contraseña
            </label>
            <input name="password" onChange={(e) => handleChange(e, setData)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="repeatpassword" type="password" placeholder="******************"></input>
          </div>
          <div className="flex flex-col">
            <div className="flex items-stretch justify-between flex-col sm:flex-row sm:items-center">
              <button onClick={() => create(data, setIsOpen, setAccounts, setPages)} className="mb-2 sm:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="button">
                Crear
              </button>
              <button onClick={() => setIsOpen(prev => !prev)} className="mb-2 sm:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="button">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      }
    </div>
  )
}