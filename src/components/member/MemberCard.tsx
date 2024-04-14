'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMember, updateMember } from 'queries/members'
import { useState, type ReactElement } from 'react'
import { formatDate } from 'utils/const'
import {
  MemberSate,
  type Member,
  type CreateMember,
  type Account,
  type HealthPlanSubscribed
} from 'utils/types'
import Image from 'next/image'
import edit from '../../../public/edit.svg'
import delete_ from '../../../public/delete_.svg'
import { MemberState } from '@prisma/client'
import { type FieldValues, useForm } from 'react-hook-form'
import { deleteHealthSubscribed } from 'queries/healthSus'

const update = async ({
  id,
  data
}: {
  id: number
  data: FieldValues
}): Promise<Member> => {
  const dataMember: CreateMember = data as CreateMember
  const newMember: Member = {
    id,
    ...dataMember
  }
  return await updateMember(newMember)
}

interface param {
  member: Member
}
export default function MemberCard({ member }: param): ReactElement {
  const [editF, setEditF] = useState<boolean>(false)

  const query = useQueryClient()

  const {
    mutate: mutateU,
    isError: isErrorU,
    isSuccess: isSuccessU,
    isPending: isPendingU
  } = useMutation({
    mutationFn: update,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['account'] })
      setEditF(false)
      reset()
    }
  })

  const {
    mutate: mutateD,
    isError: isErrorD,
    isSuccess: isSuccessD,
    isPending: isPendingD
  } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteMember(Number(id))
    },
    onSuccess: async () => {
      query.setQueryData(
        ['account', String(member.accountId)],
        (oldData: Account) => {
          return { ...oldData, memberAccount: null }
        }
      )
    }
  })

  const { mutate: deleteHealth } = useMutation({
    mutationFn: async (id: number | string) => {
      return await deleteHealthSubscribed(id)
    },
    onSuccess: (data: HealthPlanSubscribed) => {
      query.setQueryData(['account', member.accountId], (oldData: Account) => {
        const newData: Account = { ...oldData }
        const index = newData.memberAccount?.planSubscribed?.findIndex(
          (plan) => plan.id === data.id
        )
        if (index) {
          newData.memberAccount?.planSubscribed?.splice(index, 1)
        }
        return newData
      })
      setEditF(false)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  return (
    <>
      {member && (
        <div
          key={member.id}
          className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'
        >
          <form
            action=''
            id={`member${member?.id}`}
            onSubmit={handleSubmit((data) => {
              mutateU({ id: member.id, data })
            })}
          >
            <div className='flex items-center justify-between mb-2 border-b-2 border-white pb-2'>
              <h2 className='text-xl text-white'>Perfil de Alumno</h2>
              <button
                onClick={() => {
                  setEditF((prev: boolean) => !prev)
                }}
                type='button'
                className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                <Image
                  src={edit}
                  width={30}
                  height={30}
                  alt='E'
                ></Image>
              </button>
            </div>
            <div className='flex flex-col lg:flex-row gap-10'>
              <ul
                role='list'
                className='divide-y divide-gray-200 dark:divide-gray-700 w-full'
              >
                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    ID
                  </label>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    {member?.id}
                  </label>
                </li>
                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block my-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Nombre
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.name}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='text'
                        id='name'
                        form={`member${member?.id}`}
                        className='w-36 p-1 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={member?.name}
                        {...register('name', {
                          required: {
                            value: true,
                            message: 'El nombre requerido'
                          }
                        })}
                      />
                      {errors?.name && (
                        <span className='inputError'>
                          {errors.name.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Apellido
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.lastName}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='text'
                        id='lastName'
                        form={`member${member?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={member?.lastName}
                        {...register('lastName', {
                          required: {
                            value: true,
                            message: 'Apellido es requerido'
                          }
                        })}
                      />
                      {errors?.lastName && (
                        <span className='inputError'>
                          {errors.lastName.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    DNI
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.dni.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='number'
                        id='dni'
                        form={`member${member?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={member?.dni.toString()}
                        {...register('dni', {
                          required: {
                            value: true,
                            message: 'DNI es requerido'
                          }
                        })}
                      />
                      {errors?.dni && (
                        <span className='inputError'>
                          {errors.dni.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    CUIT
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.cuit?.toString()}
                    </label>
                  )}
                  {editF && (
                    <input
                      type='number'
                      id='cuit'
                      form={`member${member?.id}`}
                      className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      defaultValue={member?.cuit?.toString()}
                      {...register('cuit')}
                    />
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Número de teléfono
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.phoneNumber.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='number'
                        id='phoneNumber'
                        form={`member${member?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={member?.phoneNumber.toString()}
                        required
                        {...register('phoneNumber', {
                          required: {
                            value: true,
                            message: 'Número de teléfono es requerido'
                          }
                        })}
                      />
                      {errors?.phoneNumber && (
                        <span className='inputError'>
                          {errors.phoneNumber.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Dirección
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.address}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='text'
                        id='address'
                        form={`member${member?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={member?.address}
                        {...register('address', {
                          required: {
                            value: true,
                            message: 'Dirección es requerida'
                          }
                        })}
                      />
                      {errors?.address && (
                        <span className='inputError'>
                          {errors.address.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Fecha de inscripción
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {formatDate(member?.inscriptionDate.toString())}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='date'
                        id='inscriptionDate'
                        form={`member${member?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={formatDate(
                          member?.inscriptionDate?.toString()
                        )}
                        {...register('inscriptionDate', {
                          required: {
                            value: true,
                            message: 'Fecha es requerida'
                          }
                        })}
                      />
                      {errors?.inscriptionDate && (
                        <span className='inputError'>
                          {errors.inscriptionDate.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              </ul>

              <ul
                role='list'
                className='divide-y divide-gray-200 dark:divide-gray-700 w-full'
              >
                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Fecha de cancelación
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.cancelationDate
                        ? formatDate(member?.cancelationDate?.toString())
                        : ''}
                    </label>
                  )}
                  {editF && (
                    <input
                      type='date'
                      id='cancelationDate'
                      form={`member${member?.id}`}
                      className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      defaultValue={formatDate(
                        member?.cancelationDate?.toString()
                      )}
                      {...register('cancelationDate')}
                    />
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Motivo de cancelación
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.cancelationReason ?? ''}
                    </label>
                  )}
                  {editF && (
                    <input
                      type='text'
                      id='cancelationReason'
                      form={`member${member?.id}`}
                      className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      defaultValue={member?.cancelationReason ?? ''}
                      {...register('cancelationReason')}
                    />
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Derivado por
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.derivedBy}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='text'
                        id='derivedBy'
                        form={`member${member?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={member?.derivedBy}
                        {...register('derivedBy', {
                          required: {
                            value: true,
                            message: 'Derivación es requerida'
                          }
                        })}
                      />
                      {errors?.derivedBy && (
                        <span className='inputError'>
                          {errors.derivedBy.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Número de afiliado
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.afiliateNumber.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='number'
                        id='afiliateNumber'
                        form={`member${member?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={member?.afiliateNumber.toString()}
                        {...register('afiliateNumber', {
                          required: {
                            value: true,
                            message: 'Numero de afiliado es requerido'
                          }
                        })}
                      />
                      {errors?.afiliateNumber && (
                        <span className='inputError'>
                          {errors.afiliateNumber.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Clases remanentes
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.remainingClasses?.toString()}
                    </label>
                  )}
                  {editF && (
                    <input
                      type='number'
                      id='remainingClasses'
                      form={`member${member?.id}`}
                      className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      defaultValue={member?.remainingClasses?.toString()}
                      {...register('remainingClasses')}
                    />
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Estado
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {member?.state}
                    </label>
                  )}
                  {editF && (
                    <select
                      id='state'
                      form={`member${member?.id}`}
                      className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      defaultValue={MemberState[member?.state]}
                      {...register('state')}
                    >
                      <option value={MemberSate.ACTIVE}>Activo</option>
                      <option value={MemberState.INACTIVE}>Inactivo</option>
                      <option value={MemberState.OTHER}>Otro</option>
                    </select>
                  )}
                </li>
                <li className='flex flex-row items-center justify-between w-full mb-2'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Obras sociales
                  </label>

                  <label className='flex gap-2 my-2 text-lg font-medium text-gray-900 dark:text-white'>
                    {member?.planSubscribed?.map((health, index) => (
                      <div
                        key={index}
                        className='flex gap-2 border rounded p-1'
                      >
                        <p key={index}>{health.plan?.name}</p>
                        {editF && (
                          <button
                            onClick={() => {
                              deleteHealth(health.id)
                            }}
                          >
                            <Image
                              src={delete_}
                              width={20}
                              height={20}
                              alt='D'
                            ></Image>
                          </button>
                        )}
                      </div>
                    ))}
                    {/* {editF && (
                      <>
                        <button
                          className='dark-blue-border-button'
                          onClick={openAddHealth}
                        >
                          Agregar
                        </button>
                        <Modal
                          isOpen={addHealth}
                          closeModal={closeAddHealth}
                        >
                          <HealthAssignForm></HealthAssignForm>
                        </Modal>
                      </>
                    )} */}
                  </label>
                </li>
              </ul>
            </div>
            {editF && (
              <div className='flex flex-row justify-end w-full gap-4'>
                <div className='w-max flex flex-col items-end'>
                  <button
                    className='dark-blue-border-button'
                    form={`member${member?.id}`}
                    type='submit'
                  >
                    Enviar
                  </button>
                  {isSuccessU && <p className='w-max text-green-400'>OK</p>}
                  {isPendingU && (
                    <p className='w-max text-yellow-400'>Modificando...</p>
                  )}
                  {isErrorU && <p className='w-max text-red-400'>Failed!</p>}
                </div>
                <div className='w-max flex flex-col items-end'>
                  <button
                    className='dark-red-border-button'
                    onClick={async () => {
                      mutateD(member?.id)
                    }}
                    type='button'
                  >
                    Eliminar
                  </button>
                  {isSuccessD && <p className='w-max text-green-400'>OK</p>}
                  {isPendingD && (
                    <p className='w-max text-yellow-400'>Eliminando...</p>
                  )}
                  {isErrorD && <p className='w-max text-red-400'>Failed!</p>}
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  )
}
