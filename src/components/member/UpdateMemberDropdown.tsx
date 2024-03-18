'use client'

import { type ReactElement, useState } from 'react'
import { deleteMember, updateMember } from 'queries/members'
import { Button } from 'components/Buttons'
import {
  type CreateMember,
  type Member,
  type Setter,
  type QueriesResponse,
  MemberSate
} from 'utils/types'
import { calculatePages, APP, formatDate } from 'utils/const'
import { type FieldValues, useForm } from 'react-hook-form'

const deleteMemberB = async (
  id: number,
  members: Member[],
  setMembers: Setter,
  setPages: Setter,
  setIsOpen: Setter
): Promise<void> => {
  const response: QueriesResponse = await deleteMember(id)
  if (response.status === 200) {
    const newMembers: Member[] = [...members]
    const indexF: (e: Member) => boolean = (e: Member): boolean =>
      Number(e.id) === Number(id)
    const index: number = newMembers.findIndex(indexF)
    const deletedMember: Member[] = newMembers.splice(index, 1)
    setIsOpen((prev: boolean) => !prev)
    setMembers((odlMembers: Member[]) => {
      setPages(calculatePages(odlMembers.length - 1, APP))
      return newMembers
    })
    console.log(deletedMember)
  } else {
    console.log('Client: error on deleteMember')
  }
}

const update = async (
  id: number,
  setIsOpen: Setter,
  setMembers: Setter,
  data: FieldValues,
  members: Member[]
): Promise<void> => {
  const dataMember: CreateMember = data as CreateMember
  const newMember: Member = {
    id,
    ...dataMember
  }
  const response: QueriesResponse = await updateMember(newMember)
  if (response.status === 200) {
    const newMembers: Member[] = members.map((obj) => {
      if (obj.id === response.data.id) {
        return newMember
      }
      return obj
    })
    setMembers(newMembers)
    setIsOpen((prev: boolean) => !prev)
  } else {
    console.log('Client: error on updateMember: ')
    console.log(response.error)
  }
}

export function UpdateMemberDropdown({
  member,
  setMembers,
  members,
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
    <div className={'flex flex-col w-full'}>
      <Button
        onAction={() => {
          setIsOpen((prev) => !prev)
        }}
        text='Actualizar'
        hover='hover:bg-yellow-500'
        bg=''
      ></Button>
      {isOpen && (
        <form
          onSubmit={handleSubmit((data) => {
            void update(
              member.id as number,
              setIsOpen,
              setMembers as Setter,
              data,
              members as Member[]
            )
          })}
          id='updateForm'
          className='w-full sm:w-max bg-gray-500 shadow-md rounded px-2 pt-2 pb-2 h-max absolute left-0 right-0 bottom-0 top-0 ml-auto mr-auto mb-auto mt-auto'
        >
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='name'
            >
              Nombre
            </label>
            <input
              {...register('name', {
                required: {
                  value: true,
                  message: 'Nombre es requerido'
                }
              })}
              form='updateForm'
              defaultValue={member.name}
              name='name'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              autoComplete='off'
              placeholder={member.name}
            ></input>
            {errors?.name && (
              <span className='inputError'>
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='lastName'
            >
              Apellido
            </label>
            <input
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'Apellido es requerido'
                }
              })}
              form='updateForm'
              defaultValue={member.lastName}
              name='lastName'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='lastName'
              type='text'
              autoComplete='off'
              placeholder={member.lastName}
            ></input>
            {errors?.lastName && (
              <span className='inputError'>
                {errors.lastName.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
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
              form='updateForm'
              defaultValue={member.dni}
              name='dni'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='dni'
              type='number'
              autoComplete='off'
              placeholder={member.dni}
            ></input>
            {errors?.dni && (
              <span className='inputError'>{errors.dni.message as string}</span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='cuit'
            >
              CUIT
            </label>
            <input
              {...register('cuit')}
              form='updateForm'
              defaultValue={member.cuit}
              name='cuit'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='cuit'
              type='number'
              autoComplete='off'
              placeholder={member.cuit}
            ></input>
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='phoneNumber'
            >
              Número de teléfono
            </label>
            <input
              {...register('phoneNumber', {
                required: {
                  value: true,
                  message: 'Número de teléfono es requerido'
                }
              })}
              form='updateForm'
              defaultValue={member.phoneNumber}
              name='phoneNumber'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phoneNumber'
              type='number'
              autoComplete='off'
              placeholder={member.phoneNumber}
            ></input>
            {errors?.phoneNumber && (
              <span className='inputError'>
                {errors.phoneNumber.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
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
              form='updateForm'
              defaultValue={member.address}
              name='address'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='address'
              type='text'
              autoComplete='off'
              placeholder={member.address}
            ></input>
            {errors?.address && (
              <span className='inputError'>
                {errors.address.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='inscriptionDate'
            >
              Fecha de inscripción
            </label>
            <input
              {...register('inscriptionDate', {
                required: {
                  value: true,
                  message: 'Fecha es requerida'
                }
              })}
              form='updateForm'
              defaultValue={formatDate(member.inscriptionDate as string)}
              name='inscriptionDate'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='inscriptionDate'
              type='date'
              autoComplete='off'
            ></input>
            {errors?.inscriptionDate && (
              <span className='inputError'>
                {errors.inscriptionDate.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
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
              form='updateForm'
              defaultValue={member.derivedBy}
              name='derivedBy'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='derivedBy'
              type='text'
              autoComplete='off'
            ></input>
            {errors?.derivedBy && (
              <span className='inputError'>
                {errors.derivedBy.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='afiliateNumber'
            >
              Número de afiliado
            </label>
            <input
              {...register('afiliateNumber', {
                required: {
                  value: true,
                  message: 'Numero de afiliado es requerido'
                }
              })}
              form='updateForm'
              defaultValue={member.afiliateNumber}
              name='afiliateNumber'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='afiliateNumber'
              type='number'
              autoComplete='off'
            ></input>
            {errors?.afiliateNumber && (
              <span className='inputError'>
                {errors.afiliateNumber.message as string}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-white text-base font-bold mb-2'
              htmlFor='state'
            >
              Estado
            </label>
            <select
              {...register('state', {
                required: {
                  value: true,
                  message: 'Estado es requerido'
                }
              })}
              form='updateForm'
              defaultValue={MemberSate[member.state]}
              name='state'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='state'
              autoComplete='off'
            >
              <option value={MemberSate.ACTIVE}>Activo</option>
              <option value={MemberSate.INACTIVE}>Inactivo</option>
              <option value={MemberSate.OTHER}>Otro</option>
            </select>
            {errors?.state && (
              <span className='inputError'>
                {errors.state.message as string}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <div className='flex items-stretch sm:items-center justify-between flex-col sm:flex-row'>
              <button
                form='updateForm'
                className='mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Enviar
              </button>
              <button
                onClick={() => {
                  setIsOpen((prev) => !prev)
                }}
                className='mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Cancelar
              </button>
            </div>
            <button
              onClick={() => {
                void deleteMemberB(
                  member.id as number,
                  members as Member[],
                  setMembers as Setter,
                  setPages as Setter,
                  setIsOpen
                )
              }}
              className='hover:bg-red-500 border border-red-500 flex flex-row rounded w-full p-2'
              type='button'
            >
              Eliminar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
