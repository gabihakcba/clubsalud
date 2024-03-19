'use client'

import { type ReactElement, useState } from 'react'
import { getAccounts } from 'queries/accounts'
import { APP } from 'utils/const'
import AccountCard from 'components/account/AccountCard'
import AccountTopbar from 'components/account/AccountTopbar'
import { useQuery } from '@tanstack/react-query'
import AccountsPaginationBar from 'components/account/AccountsPaginationBar'
import { type Permissions } from 'utils/types'

const getAccountsElems = async (info): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, currentPage, elems, filterName, filterPermissions]: [
    string,
    number,
    number,
    string,
    Permissions
  ] = info.queryKey
  const response = await getAccounts(
    currentPage,
    elems,
    filterName,
    filterPermissions
  )
  return response.data
}

export default function Accounts(): ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterName, setFilterName] = useState<string>('')
  const [filterPermissions, setFilterPermissions] = useState<Permissions | ''>(
    ''
  )
  const key = ['acc', currentPage, APP, filterName, filterPermissions]
  const { data } = useQuery({
    queryKey: key,
    queryFn: async (info) => {
      return await getAccountsElems(info)
    },
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: false,
    staleTime: 1000 * 60 * 5
  })

  const accounts = data?.pages ?? []

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
            gridTemplateColumns: 'repeat(auto-fill, minmax(9rem,1fr))',
            gap: '0,5rem',
            alignContent: 'flex-start',
            maxHeight: '95dvh',
            overflow: 'scroll'
          }}
        >
          {accounts.length > 0 &&
            accounts.map((account) => (
              <div
                key={Math.random()}
                className=''
                style={{
                  justifySelf: 'center'
                  // 'border': '1px solid red'
                }}
              >
                <AccountCard
                  account={account}
                  accounts={accounts}
                ></AccountCard>
              </div>
            ))}
        </section>
        <nav className='w-full flex flex-row justify-center'>
          <AccountsPaginationBar
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={data?.totalPages ?? 1}
          ></AccountsPaginationBar>
        </nav>
      </main>
    </div>
  )
}
