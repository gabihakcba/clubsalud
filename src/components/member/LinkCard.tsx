'use client'

import { useEffect, type ReactElement, useState } from 'react'
import { getMemberById } from 'queries/members'
import { formatDate } from 'utils/const'
import { type Member, type Setter } from 'utils/types'

interface param {
  params: {
    id: string
  }
}

const get = async (setMember: Setter, id: number): Promise<void> => {
  const response = await getMemberById(id)
  if (response.status === 200) {
    console.log(typeof response.data.inscriptionDate)
    setMember(response.data)
  } else {
    console.log(response.error)
  }
}

export default function LinkCard({ params }: param): ReactElement {
  const [member, setMember] = useState<Member>()
  useEffect(() => {
    void get(setMember, Number(params.id))
  }, [])
  return (
    <div className='w-max p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex items-center justify-start mb-4 gap-4'>
        <div className='flex-shrink-0'>
          <img
            className='w-8 h-8 rounded-full'
            src='/docs/images/people/profile-picture-1.jpg'
            alt='Neil image'
          />
        </div>
        <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
          {member?.name} {member?.lastName} {member?.id}
        </h5>
        {/* <button
            // onClick={}
            className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
          >
            Editar
          </button> */}
      </div>
      <div className='flex flex-row w-max gap-28'>
        <ul
          role='list'
          className='divide-y divide-gray-200 dark:divide-gray-700'
        >
          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  DNI
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.dni}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  CUIT
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.cuit}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  Número de teléfono
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.phoneNumber}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  DNI
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.dni}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  Direccion
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.address}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  Fecha de inscripción
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.inscriptionDate
                  ? formatDate(member?.inscriptionDate.toString())
                  : ''}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  Fecha de cancelación
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.cancelationDate
                  ? formatDate(member?.cancelationDate?.toString())
                  : ''}
              </div>
            </div>
          </li>
        </ul>

        <ul
          role='list'
          className='divide-y divide-gray-200 dark:divide-gray-700'
        >
          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  Motivo de cancelación
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.cancelationReason ?? ''}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  Derivado por
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.derivedBy}
              </div>
            </div>
          </li>

          <li className='py-3 sm:py-4'>
            <div className='flex items-center justify-between gap-20'>
              <div className=''>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  Número de afiliado
                </p>
              </div>
              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                {member?.afiliateNumber}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
