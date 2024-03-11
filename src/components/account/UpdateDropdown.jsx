'use client'

import { useRef, useState } from "react"
import { updateAccount } from "@/queries/accounts"
import { Button } from "@/components/Buttons"

const update = async (account, setIsOpen, setAccounts, data, accounts) => {
  const newAccount = {
    username: data.username.current.value,
    password: data.password.current.value,
    permissions: data.permissions.current.value
  }

  if (newAccount.password !== data.repeatpassword.current.value) {
    alert('Las contraseñas deben coincidir')
  }
  else if (newAccount.permissions === 'OTHER') {
    alert('Selecciones los permisos adecuados')
  }
  else {
    const response = await updateAccount(account.id, newAccount)
    if (response.status === 200) {
      const newAccounts = accounts.map(obj => {
        if (obj.id === response.data.id) {
          return newAccount;
        }
        return obj;
      });
      setAccounts(newAccounts)
      setIsOpen(prev => !prev)
    }
    else {
      console.log('Client: error on updateAccount')
    }
  }
}

export function UpdateDropdown({ account, setAccounts, accounts }) {
  const [isOpen, setIsOpen] = useState(false)

  const data = {
    username: useRef(),
    password: useRef(),
    repeatpassword: useRef(),
    permissions: useRef()
  }

  return (
    <div className={'flex flex-col w-full'}>
      <Button onAction={() => setIsOpen(prev => !prev)} text='Actualizar' hover='hover:bg-yellow-500' bg=''></Button>
      {
        isOpen &&
        <form className="w-full sm:w-max bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max absolute left-0 right-0 bottom-auto top-0 ml-auto mr-auto border-2 border-red-500">
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="username">
              Nombre de Usuario
            </label>
            <input ref={data.username} defaultValue={account.username} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={account.username}></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input ref={data.password} defaultValue={account.password} name="password" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="repeatpassword">
              Repetir Contraseña
            </label>
            <input ref={data.repeatpassword} defaultValue={account.password} name="password" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="repeatpassword" type="password" placeholder="******************"></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="permisos">
              Permisos
            </label>
            <select ref={data.permissions} name="permissions" id="permissions" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="OWN">Propietario</option>
              <option value="ADM">Administrador</option>
              <option value="INS">Instructor</option>
              <option value="MEM">Alumno</option>
              <option value="OTHER" selected>Otro</option>
            </select>
          </div>
          <div className="flex flex-col">
            <div className="flex items-stretch sm:items-center justify-between flex-col sm:flex-row">
              <button onClick={() => update(account, setIsOpen, setAccounts, data, accounts)} className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Enviar
              </button>
              <button onClick={() => setIsOpen(prev => !prev)} className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      }
    </div>
  )
}