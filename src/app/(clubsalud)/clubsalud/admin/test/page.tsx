'use client'

import { Button } from 'primereact/button'
import { getUsers } from 'queries/Medintt/users'
import { type ReactElement } from 'react'
export default function Test(): ReactElement {
  return (
    <div className='flex flex column p-8'>
      <Button
        label='test'
        onClick={async () => {
          const res = await getUsers()
          console.log((await res.json()).data)
        }}
      />
    </div>
  )
}
