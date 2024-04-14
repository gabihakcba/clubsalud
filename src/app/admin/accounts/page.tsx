'use client'

import { type ReactElement, useState } from 'react'
import { getAccounts } from 'queries/accounts'
import { APP } from 'utils/const'
import AccountCard from 'components/account/AccountCard'
import AccountTopbar from 'components/account/AccountTopbar'
import { useQuery } from '@tanstack/react-query'
import AccountsPaginationBar from 'components/account/AccountsPaginationBar'
import { type Account, type Permissions } from 'utils/types'

interface getAccountsType {
  pages: Account[]
  totalPages: number
  perPage: number
  nextPage: number
  currentPage: number
}
const getAccountsElems = async (info): Promise<getAccountsType> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, currentPage, elems, filterName, filterPermissions]: [
    string,
    number,
    number,
    string,
    Permissions
  ] = info.queryKey
  return await getAccounts(currentPage, elems, filterName, filterPermissions)
}

export default function Accounts(): ReactElement {
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterName, setFilterName] = useState<string>('')
  const [filterPermissions, setFilterPermissions] = useState<Permissions | ''>(
    ''
  )
  const key = ['acc', currentPage, APP, filterName, filterPermissions]
  const { data: accounts } = useQuery({
    queryKey: key,
    queryFn: async (info) => {
      const response = await getAccountsElems(info)
      setTotalPages(response.totalPages)
      return response.pages
    }
  })

  return (
    <div className='max-h-dvh h-full w-full flex items-start justify-start flex-row'>
      <main className='mr-5 w-full h-full flex flex-col items-start justify-between'>
        <aside className='w-full h-max p-2 bg-white border-b-2 border-gray-400'>
          <AccountTopbar
            setFilterName={setFilterName}
            setFilterPermissions={setFilterPermissions}
          ></AccountTopbar>
        </aside>
        <section
          className='mt-5 ml-5 h-full scrollHidden'
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(10rem,1fr))',
            gap: '1rem',
            alignContent: 'flex-start',
            maxHeight: '95dvh',
            overflow: 'scroll'
          }}
        >
          {accounts?.map((account, index) => (
            <AccountCard
              account={account}
              key={index}
            ></AccountCard>
          ))}
        </section>
        <nav className='w-full flex flex-row justify-center'>
          <AccountsPaginationBar
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          ></AccountsPaginationBar>
        </nav>
      </main>
    </div>
  )
}
