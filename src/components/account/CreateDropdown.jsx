'use client'

import { useState } from "react"

const handleChange = (e, setData) => {
  setData(data => {
    return {
      ...data,
      [e.target.id]: e.target.value
    }
  })
}

export function CreateDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  return (
    <div className={'flex flex-col w-44 pl-5'}>
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
              Username
            </label>
            <input name="password" onChange={(e) => handleChange(e, setData)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input name="password" onChange={(e) => handleChange(e, setData)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="password">
              Repeat Password
            </label>
            <input name="password" onChange={(e) => handleChange(e, setData)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between flex-col sm:flex-row">
              <button onClick={() => signIn(router, data, setLogginFailed)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Create
              </button>
              <button onClick={() => setIsOpen(prev => !prev)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      }
    </div>
  )
}