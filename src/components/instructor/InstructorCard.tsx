import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteInstructor,
  getInstructorById,
  updateInstructor
} from 'queries/instructors'
import { useState, type ReactElement } from 'react'
import { type Instructor, type CreateInstructor } from 'utils/types'
import Image from 'next/image'
import edit from '../../../public/edit.svg'
import { type FieldValues, useForm } from 'react-hook-form'

const update = async ({
  id,
  data
}: {
  id: number
  data: FieldValues
}): Promise<Instructor> => {
  const dataInstructor: CreateInstructor = data as CreateInstructor
  const newInstructor: Instructor = {
    id,
    ...dataInstructor
  }
  const response = await updateInstructor(newInstructor)
  return response.data
}

const delete_ = async ({ id }: { id: number }): Promise<any> => {
  return await deleteInstructor(id)
}

const getInfo = async (info): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, id]: [string, number] = info.queryKey
  const response = await getInstructorById(id)
  const parsed = {
    ...response.data,
    degree: response.data.degree ? 'true' : 'false'
  }
  return parsed
}

interface param {
  id: number
  closeModal: () => void
}

export default function InstructorCard({
  id,
  closeModal
}: param): ReactElement {
  const [editF, setEditF] = useState<boolean>(false)
  const { data } = useQuery({
    queryKey: ['ins', id],
    queryFn: async (info) => {
      return await getInfo(info)
    },
    staleTime: 1000 * 60 * 5
  })

  const instructor: Instructor = data

  const query = useQueryClient()

  const {
    mutate: mutateC,
    isError: isErrorC,
    isSuccess: isSuccessC,
    isPending: isPendingC
  } = useMutation({
    mutationFn: update,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['ins', id] })
      setEditF(false)
      reset()
      setTimeout(closeModal, 500)
    }
  })

  const {
    mutate: mutateD,
    isError: isErrorD,
    isSuccess: isSuccessD,
    isPending: isPendingD
  } = useMutation({
    mutationFn: delete_,
    onSuccess: async () => {
      query.setQueryData(['ins', id], null)
      reset()
      setEditF(false)
      setTimeout(closeModal, 500)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
    // watch
  } = useForm()

  return (
    <div className='w-max p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <form
        action=''
        id={`member${instructor?.id}`}
        onSubmit={handleSubmit((data) => {
          mutateC({ id: instructor.id, data })
        })}
      >
        <div className='flex items-center justify-end mb-2'>
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
        <div className='flex flex-row w-[60rem] gap-28'>
          <ul
            role='list'
            className='divide-y divide-gray-200 dark:divide-gray-700 w-full'
          >
            <li className='flex flex-row items-center justify-between w-full mb-2'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                ID
              </label>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                {instructor?.id}
              </label>
            </li>
            <li className='flex flex-row items-center justify-between w-full mb-2'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                Nombre
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {instructor?.name}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='text'
                    id='name'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.name}
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
                  {instructor?.lastName}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='text'
                    id='lastName'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.lastName}
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
                  {instructor?.dni.toString()}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='number'
                    id='dni'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.dni.toString()}
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
                  {instructor?.cuit?.toString()}
                </label>
              )}
              {editF && (
                <input
                  type='number'
                  id='cuit'
                  form={`member${instructor?.id}`}
                  className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  defaultValue={instructor?.cuit?.toString()}
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
                  {instructor?.phoneNumber.toString()}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='number'
                    id='phoneNumber'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.phoneNumber.toString()}
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
          </ul>

          <ul
            role='list'
            className='divide-y divide-gray-200 dark:divide-gray-700 w-full'
          >
            <li className='flex flex-row items-center justify-between w-full mb-2'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                Dirección
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {instructor?.address}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='text'
                    id='address'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.address}
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
                E-mail
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {instructor?.email}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='email'
                    id='email'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.email}
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Dirección de e-mail es requerida'
                      }
                    })}
                  />
                  {errors?.email && (
                    <span className='inputError'>
                      {errors.email.message as string}
                    </span>
                  )}
                </div>
              )}
            </li>

            <li className='flex flex-row items-center justify-between w-full mb-2'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                Título
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {instructor?.degree}
                </label>
              )}
              {editF && (
                <div>
                  <select
                    id='degree'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.degree === 'true' ? 'si' : 'no'}
                    {...register('degree', {
                      required: {
                        value: true,
                        message: 'Título es requerido'
                      }
                    })}
                  >
                    <option value={'true'}>Si</option>
                    <option value={'false'}>No</option>
                  </select>
                  {errors?.degree && (
                    <span className='inputError'>
                      {errors.degree.message as string}
                    </span>
                  )}
                </div>
              )}
            </li>

            <li className='flex flex-row items-center justify-between w-full mb-2'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                CBU
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {instructor?.cbu?.toString()}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='number'
                    id='cbu'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.cbu?.toString()}
                    {...register('cbu')}
                  />
                </div>
              )}
            </li>

            <li className='flex flex-row items-center justify-between w-full mb-2'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                Alias
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {instructor?.alias}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='text'
                    id='alias'
                    form={`member${instructor?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={instructor?.alias ?? ''}
                    {...register('alias')}
                  />
                </div>
              )}
            </li>
          </ul>
        </div>
        {editF && (
          <div className='flex flex-row justify-end w-full gap-4'>
            <div className='w-max flex flex-col items-end'>
              <button
                className='blueButtonForm w-max'
                form={`member${instructor?.id}`}
                type='submit'
              >
                Enviar
              </button>
              {isSuccessC && <p className='w-max text-green-400'>OK</p>}
              {isPendingC && (
                <p className='w-max text-yellow-400'>Modificando...</p>
              )}
              {isErrorC && <p className='w-max text-red-400'>Failed!</p>}
            </div>
            <div className='w-max flex flex-col items-end'>
              <button
                className='blueButtonForm w-max bg-red-500 hover:bg-red-600'
                onClick={async () => {
                  mutateD({ id: instructor?.id })
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
  )
}
