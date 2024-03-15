'use client'

import { type ReactElement } from 'react'
import { CreateAccountForm } from 'components/account/CreateAccountForm'
export default function Test(): ReactElement {
  return (
    <div className='w-max h-max max-h-[30rem] overflow-scroll scrollHidden'>
      <CreateAccountForm></CreateAccountForm>
    </div>
  )
}
