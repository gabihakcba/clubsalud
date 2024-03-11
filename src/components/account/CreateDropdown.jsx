'use client'

import { useState } from "react"
import { createAccount } from "@/queries/accounts"
import { APP, calculatePages } from "@/utils/const"

const handleChange = (e, setData) => {
  setData(data => {
    return {
      ...data,
      [e.target.id]: e.target.value
    }
  })
}

const create = async (data, setIsOpen, setAccounts, setPages) => {
  if (data.password !== data.repeatpassword) {
    alert('Las contraseñas deben coincidir')
  }
  else if (data.permissions === 'OTHER') {
    alert('Selecciones los permisos adecuados')
  }
  else {
    try {
      const response = await createAccount(data)
      if (response.id) {
        setIsOpen(prev => !prev)
        setAccounts(prev => {
          setPages(calculatePages(prev.length+1, APP))
          return prev.concat(response)
        })
      }
    } catch (error) {
      alert('Algun dato es incorrecto')
    }
  }
}

export function CreateDropdown({ setAccounts, setPages }) {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({
    username: '',
    password: '',
    repeatpassword: '',
    permissions: ''
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