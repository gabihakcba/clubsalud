'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEmployee, updateEmployee } from 'queries/employees'
import { useState, type ReactElement } from 'react'
import { type Employee, JobPosition, ContractType } from 'utils/types'
import Image from 'next/image'
import edit from '../../../public/edit.svg'
import { useForm } from 'react-hook-form'
import { formatDate } from 'utils/const'

interface param {
  employee: Employee
}
export default function UpdateEmployeeForm({ employee }: param): ReactElement {
  const [editF, setEditF] = useState<boolean>(false)

  const query = useQueryClient()

  const {
    mutate: mutateU,
    isError: isErrorU,
    isSuccess: isSuccessU,
    isPending: isPendingU
  } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async (data) => {
      await query.refetchQueries({ queryKey: ['employees'] })
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
      return await deleteEmployee(Number(id))
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['employees'] })
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
      {employee && (
        <div
          key={employee.id}
          className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'
        >
          <form
            action=''
            id={`employee${employee.id}`}
            onSubmit={handleSubmit((data) => {
              const parsed: Employee = {
                id: Number(employee.id),
                name: String(data.name),
                lastName: String(data.lastName),
                dni: BigInt(data.dni as number),
                phoneNumber: BigInt(data.phoneNumber as number),
                position: JobPosition[data.position],
                contractType: ContractType[data.contractType],
                alias: data.alias !== '' ? data.alias : undefined,
                email: String(data.email),
                cbu:
                  data.cbu && String(data.cbu) !== ''
                    ? BigInt(data.cbu as number)
                    : undefined,
                salary: parseFloat(data.salary as string)
              }

              if (Number(data.salary) !== Number(employee.salary)) {
                parsed.lastSalaryUpdate = new Date()
              }

              mutateU(parsed)
            })}
          >
            <div className='flex items-center justify-between mb-2 border-b-2 border-white pb-2'>
              <h2 className='text-xl text-white'>Perfil de empleado</h2>
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
                className='divide-y divide-gray-200 dark:divide-gray-700 w-full flex flex-col'
              >
                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    ID
                  </label>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    {employee?.id}
                  </label>
                </li>
                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block my-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Nombre
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.name}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='text'
                        id='name'
                        form={`employee${employee?.id}`}
                        className='w-36 p-1 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={employee?.name}
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

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Apellido
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.lastName}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='text'
                        id='lastName'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={employee?.lastName}
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

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    DNI
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.dni.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='number'
                        id='dni'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={employee?.dni.toString()}
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

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    CUIT
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.cuit?.toString()}
                    </label>
                  )}
                  {editF && (
                    <input
                      type='number'
                      id='cuit'
                      form={`employee${employee?.id}`}
                      className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      defaultValue={employee?.cuit?.toString()}
                      {...register('cuit')}
                    />
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Número de teléfono
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.phoneNumber.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='number'
                        id='phoneNumber'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={employee?.phoneNumber.toString()}
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
                className='divide-y divide-gray-200 dark:divide-gray-700 w-full flex flex-col'
              >
                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Email
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.email.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='email'
                        id='email'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={employee?.email}
                        required
                        {...register('email', {
                          required: {
                            value: true,
                            message: 'Campo requerido'
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

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Posición
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.position.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <select
                        id='position'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={JobPosition[
                          employee?.position
                        ].toString()}
                        required
                        {...register('position', {
                          required: {
                            value: true,
                            message: 'Campo requerido'
                          }
                        })}
                      >
                        <option value={JobPosition.CLEANING.toString()}>
                          Limpieza
                        </option>
                        <option value={JobPosition.MAINTENANCE.toString()}>
                          Mantenimiento
                        </option>
                        <option value={JobPosition.RECEPTIONIST.toString()}>
                          Recepcionista
                        </option>
                        <option value={JobPosition.OTHER.toString()}>
                          Otro
                        </option>
                      </select>
                      {errors?.position && (
                        <span className='inputError'>
                          {errors.position.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Tipo de contrato
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.contractType.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <select
                        id='contractType'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={ContractType[employee?.contractType]}
                        required
                        {...register('contractType', {
                          required: {
                            value: true,
                            message: 'Campo requerido'
                          }
                        })}
                      >
                        <option value={ContractType.CASUAL}>Casual</option>
                        <option value={ContractType.PERMANENT}>
                          Permanente
                        </option>
                        <option value={ContractType.OTHER}>Otro</option>
                      </select>
                      {errors?.contractType && (
                        <span className='inputError'>
                          {errors.contractType.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Salario
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.salary.toString()}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='number'
                        id='salary'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={employee?.salary}
                        required
                        {...register('salary', {
                          required: {
                            value: true,
                            message: 'Campo requerido'
                          }
                        })}
                      />
                      {errors?.salary && (
                        <span className='inputError'>
                          {errors.salary.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    CBU
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.cbu ? Number(employee?.cbu) : null}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='number'
                        id='cbu'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={
                          employee?.cbu ? Number(employee?.cbu) : undefined
                        }
                        {...register('cbu')}
                      />
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between w-full mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Alias
                  </label>
                  {!editF && (
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                      {employee?.alias}
                    </label>
                  )}
                  {editF && (
                    <div>
                      <input
                        type='text'
                        id='alias'
                        form={`employee${employee?.id}`}
                        className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        defaultValue={
                          employee?.alias !== '' ? employee.alias : undefined
                        }
                        {...register('alias')}
                      />
                    </div>
                  )}
                </li>

                <li className='flex flex-row items-center justify-between min-w-max mb-2 gap-4'>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    Ultima actualización
                  </label>
                  <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                    {formatDate(employee.lastSalaryUpdate?.toString() ?? '')}
                  </label>
                </li>
              </ul>
            </div>
            {editF && (
              <div className='flex flex-row justify-end w-full gap-4'>
                <div className='w-max flex flex-col items-end'>
                  <button
                    className='dark-blue-border-button'
                    form={`employee${employee?.id}`}
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
                      mutateD(employee?.id)
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
