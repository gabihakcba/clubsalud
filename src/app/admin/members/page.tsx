'use client'

import { useEffect, useState } from "react"
import { Limits, Member, MemberSate, QueriesResponse } from "utils/types"
import { getMembers, getTotalPagesM } from "queries/members"
import { Menu } from "asserts/svgs/Menu"
import { UpdateDropdown } from "components/members/UpdateDropdown"
import { CreateDropdown } from "components/members/CreateDropdown"
import AccountsPaginationBar from "components/account/AccountsPaginationBar"
import { APP } from "utils/const"

const setMembersElems = async (setMembers: Function): Promise<void> => {
  const response: QueriesResponse = await getMembers()
  if (response.status === 200) {
    setMembers(response.data)
  }
  else {
    console.log('Client: error on getMembers')
  }
}

const getPages = async (setPages: Function): Promise<void> => {
  const response: QueriesResponse = await getTotalPagesM()
  if (response.status === 200) {
    setPages(response.data)
  }
  else{
    console.log('Cliente: error on getTotalPagesM')
  }
}

export default function Members() {
  const [members, setMembers] = useState<Array<Member>>([])
  const [drop, setDrop] = useState<boolean>(false)
  const [pages, setPages] = useState<number>(1)
  const [filterName, setFilterName] = useState<string>('')
  const [filterState, setFilterState] = useState<MemberSate | ''>('')
  const [limits, setLimits] = useState<Limits>({ start: 0, end: APP })

  useEffect(() => {
    setMembersElems(setMembers)
    getPages(setPages)
  }, [])
  
  return (
    <div className="max-h-dvh h-full w-full flex items-start justify-start flex-row">
      <main className="mr-5 w-full h-full flex flex-col items-start justify-between">
        <div className="flex flex-col bg-white md:bg-transparent md:flex-row w-full m-2  content-center">
          <button onClick={() => setDrop(prev => !prev)} className="mx-2 h-auto py-2"><Menu></Menu></button>
          {drop &&
            <div className={`flex flex-col absolute top-16 left-4 w-max bg-white md:bg-transparent md:top-auto md:left-auto md:relative md:flex-row md:w-full`}>
              <CreateDropdown setMembers={setMembers} setPages={setPages}></CreateDropdown>
              <button onClick={() => setMembersElems(setMembers)} className="w-full mb-5 md:m-2 md:w-max md:mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Actualizar
              </button>
              <input onChange={(e) => setFilterName(e.target.value)} autoComplete="off" defaultValue={''} name="password" className="w-full mb-5 md:m-2 md:w-max md:mr-5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={'Nombre de usuario'}></input>
              <select onChange={(e) => setFilterState(e.target.value as MemberSate)} name="permissions" id="permissions" className="w-full mb-5 md:m-2 md:w-max md:mr-5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value={MemberSate.ACTIVE}>Activo</option>
                <option value={MemberSate.INACTIVE}>Inactivo</option>
                <option value={MemberSate.OTHER}>Otro</option>
                <option value=''>Sin Filtro</option>
              </select>
            </div>
          }
        </div>
        <section className="mt-5 ml-5 h-full" style={{
          'width': '100%',
          'height': '100%',
          'display': 'grid',
          'gridTemplateColumns': 'repeat(auto-fill, minmax(9rem,1fr))',
          'gap': '0,5rem',
          'alignContent': 'flex-start',
          'maxHeight': '95dvh',
          'overflow': 'scroll'
        }}>
          {
            members
              .filter((member) => member.state.includes(filterState))
              .filter((member) => (member.name).toLowerCase().includes((filterName).toLowerCase()))
              .slice(limits.start, limits.end)
              .map((member, index) => (
                <section key={index} className="" style={{
                  'justifySelf': 'center',
                  // 'border': '1px solid red'
                }}>
                  <div className="bg-white shadow-md rounded p-3 mb-5 h-max w-min">
                    <div className="mb-2">
                      <input name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={`${member.name}`} disabled></input>
                    </div>
                    <div className="mb-2">
                      <input name="permissions" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder={`${member.state}`} disabled></input>
                    </div>
                    <div className="flex flex-row">
                      <UpdateDropdown member={member} setMembers={setMembers} members={members} setPages={setPages}></UpdateDropdown>
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