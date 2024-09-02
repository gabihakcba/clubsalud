'use client'

import { type ReactElement } from 'react'
import { type BilledConsultation } from 'utils/types'

interface params {
  billed: BilledConsultation
}
export default function BilledConsultationCard({
  billed
}: params): ReactElement {
  return (
    <div className='border rounded flex flex-col gap-2 p-4'>
      <div>{billed.plan.member?.name}</div>
      <hr />
      <div className='flex gap-2'>
        <label
          htmlFor=''
          className='grow'
        >
          Pago
        </label>
        <div className='bg-gray-200 grow text-center'>${billed.amount}</div>
      </div>
      <div className='flex gap-2'>
        <label
          htmlFor=''
          className='grow'
        >
          Plan
        </label>
        <div className='bg-gray-200 grow text-center'>
          {billed.subscription?.promotion?.title}
        </div>
      </div>
      <div className='flex gap-2'>
        <label
          htmlFor=''
          className='grow'
        >
          Obra social
        </label>
        <div className='bg-gray-200 grow text-center'>
          {billed.plan.plan?.name}
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
          {billed.date.toString()}
        </div>
      </div>
    </div>
  )
}
