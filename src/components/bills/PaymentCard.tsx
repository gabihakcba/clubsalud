'use client'

import { type ReactElement } from 'react'
import { formatDate } from 'utils/const'
import { type Payment } from 'utils/types'

interface params {
  payment: Payment
}
export default function PaymentCard({ payment }: params): ReactElement {
  return (
    <div className='border rounded flex flex-col gap-2 p-4'>
      <div>{payment.member?.name}</div>
      <hr />
      <div className='flex gap-2'>
        <label
          htmlFor=''
          className='grow'
        >
          Pago
        </label>
        <div className='bg-gray-200 grow text-center'>${payment.amount}</div>
      </div>
      <div className='flex gap-2'>
        <label
          htmlFor=''
          className='grow'
        >
          Plan
        </label>
        <div className='bg-gray-200 grow text-center'>
          {payment.subscription?.promotion?.title}
        </div>
      </div>
      <div className='flex gap-2'>
        <label
          htmlFor=''
          className='grow'
        >
          Fecha
        </label>
        <div className='bg-gray-200 grow text-center'>
          {formatDate(payment.date.toString())}
        </div>
      </div>
    </div>
  )
}
