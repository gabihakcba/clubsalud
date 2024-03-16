'use client'

import AccountsPaginationBar from 'components/account/AccountsPaginationBar'
import { type ReactElement, useEffect, useState } from 'react'
import { getAccounts, getTotalPagesA } from 'queries/accounts'
import { APP } from 'utils/const'
import {
  type QueriesResponse,
  type Account,
  type Limits,
  type Permissions,
  type Setter
} from 'utils/types'
import AccountCard from 'components/account/AccountCard'
import AccountTopbar from 'components/account/AccountTopbar'

const setAccountsElems = async (
  setAccounts: Setter,
  page: number = 0
): Promise<void> => {
  const response: QueriesResponse = await getAccounts(page)
  if (response.status === 200) {
    setAccounts(response.data)
  } else {
    console.log('Client: error on getAccounts')
  }
}

const getPages = async (setPages: Setter): Promise<void> => {
  const response: QueriesResponse = await getTotalPagesA()
  if (response.status === 200) {
    setPages(response.data)
  } else {
    console.log('Client: error on getTotalPagesA')
  }
}

export default function Accounts(): ReactElement {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [pages, setPages] = useState<number>(1)
  const [filterName, setFilterName] = useState<string>('')
  const [filterPermissions, setFilterPermissions] = useState<Permissions | ''>(
    ''
  )
  const [limits, setLimits] = useState<Limits>({ start: 0, end: APP })

  useEffect(() => {
    void setAccountsElems(setAccounts)
    void getPages(setPages)
  }, [])

  return (
    <div className='max-h-dvh h-full w-full flex items-start justify-start flex-row'>
      <main className='mr-5 w-full h-full flex flex-col items-start justify-between'>
        <div className='w-full h-max p-2 bg-white border-b-2 border-gray-400'>
          <AccountTopbar
            setAccounts={setAccounts}
            setPages={setPages}
            setFilterName={setFilterName}
            setFilterPermissions={setFilterPermissions}
          ></AccountTopbar>
        </div>
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
          {accounts
            .filter((account) =>
              account.permissions.includes(filterPermissions)
            )
            .filter((account) =>
              account.username.toLowerCase().includes(filterName.toLowerCase())
            )
            .slice(limits.start, limits.end)
            .map((account, index) => (
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
                  setAccounts={setAccounts}
                  accounts={accounts}
                  setPages={setPages}
                ></AccountCard>
              </div>
            ))}
        </section>
        <nav className='w-full'>
          <AccountsPaginationBar
            pagesNumber={pages}
            setLimits={setLimits}
          ></AccountsPaginationBar>
        </nav>
      </main>
    </div>
  )
}
