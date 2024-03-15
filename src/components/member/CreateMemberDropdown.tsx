'use client'

import { type ReactElement, useState } from 'react'
import { findAccountByUsername } from 'queries/accounts'
import {
  type CreateMember,
  type Member,
  type Setter,
  type QueriesResponse
} from 'utils/types'
import { MemberSate } from 'utils/types'
import { calculatePages, APP } from 'utils/const'
import { type FieldValues, useForm } from 'react-hook-form'
import { createMember } from 'queries/members'

const idAccount = async (username: string): Promise<number> => {
  const response = await findAccountByUsername(username)
  if (response.status === 200) {
    return response.data.id
  } else {
    return -1
  }
}

const formToMember = (data: FieldValues, id: number): CreateMember => {
  return {
    name: data.name,
    lastName: data.lastName,
    dni: data.dni,
    cuit: data.cuit,
    phoneNumber: data.phoneNumber,
    address: data.address,
    inscriptionDate: data.inscriptionDate,
    derivedBy: data.derivedBy,
    afiliateNumber: data.afiliateNumber,
    state: MemberSate.ACTIVE,
    accountId: id
  }
}

const create = async (
  data: FieldValues,
  setIsOpen: Setter,
  setMembers: Setter,
  setPages: Setter
): Promise<void> => {
  const id = await idAccount(data.accountName as string)
  if (id > 0) {
    const newMember: CreateMember = formToMember(data, id)
    const response: QueriesResponse = await createMember(newMember)
    if (response.status === 200) {
      setIsOpen((prev: boolean) => !prev)
      setMembers((prev: Member[]) => {
        setPages(calculatePages(prev.length + 1, APP))
        return [...prev, response.data]
      })
    } else {
      console.log('Client: error on createMember')
      console.log(response.status)
      console.log(response.error)
    }
  } else {
    alert('Cuenta asociada no encontrada')
  }
}

export function CreateMemberDropdown({
  setMembers,
  setPages
}: any): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
    // watch
  } = useForm()

  return (
    <div className={'flex flex-col w-full mb-5 md:m-2 md:w-max md:mr-5'}>
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen((prev) => !prev)
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'
        >
          Crear Alumno
        </button>
      )}
      {isOpen && (
        <form
          onSubmit={handleSubmit((data) => {
            void create(
              data,
              setIsOpen,
              setMembers as Setter,
              setPages as Setter
            )
          })}
          className='bg-white shadow-md rounded px-8 pt-2 pb-2 mb-2 h-max absolute max-h-dvh overflow-scroll scroll-smooth'
          id='createForm'
        >
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='name'
            >
              Nombre
            </label>
            <input
              {...register('name', {
                required: {
                  value: true,
                  message: 'El nombre es requerido'
                }
              })}
              name='name'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              form='createForm'
              type='text'
              autoComplete='off'
              placeholder='Nombre'
            ></input>
            {errors?.name && (
              <span className='inputError'>
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='lastName'
            >
              Apellido
            </label>
            <input
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'El apellido es requerido'
                }
              })}
              name='lastName'
              id='lastName'
              form='createForm'
              type='text'
              className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Apellido'
            ></input>
            {errors?.lastName && (
              <span className='inputError'>
                {errors.lastName.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='dni'
            >
              DNI
            </label>
            <input
              {...register('dni', {
                required: {
                  value: true,
                  message: 'DNI es requerido'
                }
              })}
              name='dni'
              id='dni'
              form='createForm'
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='XX.XXX.XXX'
            ></input>
            {errors?.dni && (
              <span className='inputError'>{errors.dni.message as string}</span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='cuit'
            >
              CUIT
            </label>
            <input
              {...register('cuit')}
              name='cuit'
              id='cuit'
              form='createForm'
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='XX.XXX.XXX'
            ></input>
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='phoneNumber'
            >
              Número de teléfono
            </label>
            <input
              {...register('phoneNumber', {
                required: {
                  value: true,
                  message: 'Número de telefono es requerido'
                }
              })}
              name='phoneNumber'
              id='phoneNumber'
              form='createForm'
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='XXX XXXXXXX'
            ></input>
            {errors?.phoneNumber && (
              <span className='inputError'>
                {errors.phoneNumber.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='address'
            >
              Dirección
            </label>
            <input
              {...register('address', {
                required: {
                  value: true,
                  message: 'Dirección es requerida'
                }
              })}
              name='address'
              id='address'
              form='createForm'
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Dirección'
            ></input>
            {errors?.address && (
              <span className='inputError'>
                {errors.address.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='inscriptionDate'
            >
              Fecha de inscripción
            </label>
            <input
              {...register('inscriptionDate', {
                required: {
                  value: true,
                  message: 'Fecha de inscripción es requerida'
                }
              })}
              name='inscriptionDate'
              id='inscriptionDate'
              form='createForm'
              type='date'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            ></input>
            {errors?.inscriptionDate && (
              <span className='inputError'>
                {errors.inscriptionDate.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='derivedBy'
            >
              Derivado por
            </label>
            <input
              {...register('derivedBy', {
                required: {
                  value: true,
                  message: 'Derivación es requerida'
                }
              })}
              name='derivedBy'
              id='derivedBy'
              form='createForm'
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Nombre o relación'
            ></input>
            {errors?.derivedBy && (
              <span className='inputError'>
                {errors.derivedBy.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='afiliateNumber'
            >
              Número de afiliado
            </label>
            <input
              {...register('afiliateNumber', {
                required: {
                  value: true,
                  message: 'Número de afiliado requerido'
                }
              })}
              name='afiliateNumber'
              id='afiliateNumber'
              form='createForm'
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='XXXXX'
            ></input>
            {errors?.afiliateNumber && (
              <span className='inputError'>
                {errors.afiliateNumber.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='accountName'
            >
              Cuenta asociada
            </label>
            <input
              {...register('accountName', {
                required: {
                  value: true,
                  message: 'Nombre de usuario requerido'
                }
              })}
              name='accountName'
              id='accountName'
              form='createForm'
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Nombre de usuario de la cuenta'
            ></input>
            {errors?.accountName && (
              <span className='inputError'>
                {errors.accountName.message as string}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <div className='flex items-stretch justify-between flex-col sm:flex-row sm:items-center'>
              <button
                form='createForm'
                className='mb-2 sm:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Crear
              </button>
              <button
                onClick={() => {
                  setIsOpen((prev) => !prev)
                }}
                className='mb-2 sm:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
