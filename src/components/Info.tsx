'use client'

import React, { ReactElement, useState } from 'react'
import { updateAccount, deleteAccount } from 'queries/accounts'
import { Button } from 'components/Buttons'
import {
  Account,
  CreateAccount,
  Permissions,
  UpdateAccount,
  QueriesResponse
} from 'utils/types'
import { calculatePages, APP } from 'utils/const'
import { FieldValues, useForm } from 'react-hook-form'
import { UpdateDropdown } from './account/UpdateAccountDropdown'

export function Info({ children }: any): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  return <div className='flex flex-col'>{children}</div>
}
