'use client'

import { CreateDropdown } from "@/components/account/CreateDropdown"
import { UpdateDropdown } from "@/components/account/UpdateDropdown"
import { Button } from "@/components/Buttons"
import AccountsPaginationBar from "@/components/account/AccountsPaginationBar"
import { useEffect, useState } from "react"
import { getAccounts, deleteAccount as deleteA, getTotalPages } from "@/queries/accounts"
import { APP, calculatePages } from "@/utils/const"
import { Menu } from "@/asserts/svgs/Menu"

export const setAccountsElems = async (setAccounts, page = 0) => {
  const response = await getAccounts(page)
  if(response.status === 200) {
    setAccounts(response.data)
  }
  else {
    console.log('Client: error on getAccounts')
  }
}

const getPages = async (setPages) => {
  const response = await getTotalPages()
  if (response.status === 200) {
    setPages(response.pages)
  }
  else {
    console.log('Client: error on getPages')
  }
}

const deleteAccount = async (id, setAccounts, setPages) => {
  const response = await deleteA(id)
  if (response.status === 200) {
    setAccounts(prev => {
      setPages(calculatePages(prev.length - 1, APP))
      const newAccounts = [...prev]
      const indexF = (e) => Number(e.id) === Number(id)
      const index = prev.findIndex(indexF)
      const deletedAccount = newAccounts.splice(index, 1)
      return newAccounts
    })
  }
  else  {
    console.log('Client: error on deleteAccount')
  }
}

const handleFilterName = (e, setFilterName) => {
  setFilterName(e.target.value)
}
const handleFilterPermissions = (e, setFilterPermissions) => {
  setFilterPermissions(e.target.value)
}

export default function Accounts() {
  const [accounts, setAccounts] = useState([])
  const [pages, setPages] = useState(1)
  const [drop, setDrop] = useState(true)
  const [filterName, setFilterName] = useState('')
  const [filterPermissions, setFilterPermissions] = useState('')
  const [limits, setLimits] = useState({ start: 0, end: APP })

  useEffect(() => {
    setAccountsElems(setAccounts)
    getPages(setPages)
  }, [])

  return (
    <div className="max-h-dvh h-full w-full flex items-start justify-start flex-row">
      <main className="mr-5 w-full h-full flex flex-col items-start justify-between">
        <div className="flex flex-col bg-white md:bg-transparent md:flex-row w-full m-2  content-center">
          <button onClick={() => setDrop(prev => !prev)} className="mx-2 h-auto py-2"><Menu></Menu></button>
          {drop &&
            <div className={`flex flex-col absolute top-16 left-4 w-max bg-white md:bg-transparent md:top-auto md:left-auto md:relative md:flex-row md:w-full`}>
              <CreateDropdown setAccounts={setAccounts} setPages={setPages}></CreateDropdown>
              <button onClick={() => setAccountsElems(setAccounts)} className="w-full mb-5 md:m-2 md:w-max md:mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Actualizar
              </button>
              <input onChange={(e) => handleFilterName(e, setFilterName)} autoComplete="off" defaultValue={''} name="password" className="w-full mb-5 md:m-2 md:w-max md:mr-5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={'Nombre de usuario'}></input>
              <select onChange={(e) => handleFilterPermissions(e, setFilterPermissions)} name="permissions" id="permissions" className="w-full mb-5 md:m-2 md:w-max md:mr-5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="OWN">Propietario</option>
                <option value="ADM">Administrador</option>
                <option value="INS">Instructor</option>
                <option value="MEM">Alumno</option>
                <option value="" selected>Sin filtro</option>
              </select>
            </div>
          }
        </div>
        <section className="mt-5 ml-5 h-full" style={{
          'width': '100%',
          'height': '100%',
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fill, minmax(12rem,1fr))',
          'gap': '0,5rem',
          'align-content': 'flex-start',
          'max-height': '95dvh',
          'overflow': 'scroll'
        }}>
          {
            accounts
              .filter((account) => account.permissions.includes(filterPermissions))
              .filter((account) => (account.username).toLowerCase().includes((filterName).toLowerCase()))
              .slice(limits.start, limits.end).map((account, index) => (
                <section key={index} className="" style={{
                  'justify-self': 'center'
                }}>
                  <div className="bg-white shadow-md rounded p-3 mb-5 h-max w-min">
                    <div className="mb-2">
                      <input name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={`${account.username}`} disabled></input>
                    </div>
                    <div className="mb-2">
                      <input name="permissions" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder={`${account.permissions}`} disabled></input>
                    </div>
                    <div className="flex flex-row justify-around">
                      <Button onAction={() => deleteAccount(account.id, setAccounts, setPages)} text={'Eliminar'} hover='hover:bg-red-500' bg=''>
                      </Button>
                      <UpdateDropdown account={account} setAccounts={setAccounts} accounts={accounts}></UpdateDropdown>
                    </div>
                  </div>
                </section>
              ))
          }
        </section>
        <nav className="w-full">
          <AccountsPaginationBar pagesNumber={pages} setLimits={setLimits}></AccountsPaginationBar>
        </nav>
      </main >
    </div >
  )
}