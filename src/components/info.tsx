// 'use client'

// import React, { ReactElement, useState } from 'react'
// import { updateAccount, deleteAccount } from 'queries/accounts'
// import { Button } from 'components/Buttons'
// import { Account, CreateAccount, Permissions, UpdateAccount } from 'utils/types'
// import { calculatePages, APP } from 'utils/const'
// import QueriesResponse from 'utils/types'
// import { FieldValues, useForm } from 'react-hook-form'
// import { UpdateDropdown } from './account/UpdateDropdown'

// export function Info({
//   account,
//   setAccounts,
//   accounts,
//   setPages
// }: any): ReactElement {
//   const [isOpen, setIsOpen] = useState<boolean>(false)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch
//   } = useForm()

//   return (
//     <div>
//       <UpdateDropdown
//         account={account}
//         setAccounts={setAccounts}
//         accounts={accounts}
//         setPages={setPages}
//       ></UpdateDropdown>
//     </div>
//   )
// }
