'use client'

import {
  type CreateAccount,
  Permissions,
  type UpdateAccount,
  type Account
} from 'utils/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { createAccount, updateAccount } from 'queries/accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ReactElement } from 'react'

const updateA = async ({
  data,
  id
}: {
  data: FieldValues
  id: number
}): Promise<any> => {
  const newAccount: UpdateAccount = {
    id,
    ...(data as CreateAccount)
  }
  const response = await updateAccount(newAccount)
  return response.data
}

const createA = async (data: FieldValues): Promise<any> => {
  const newUser: CreateAccount = data as CreateAccount

  const response = await createAccount(newUser)
  return response.data
}

interface params {
  data: Account | null
  closeModal: () => void
}

export function CreateAccountForm({ data, closeModal }: params): ReactElement {
  const query = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()

  const {
    mutate: createAccount,
    isSuccess: isSuccessC,
    isPending: isPendingC,
    isError: isErrorC
  } = useMutation({
    mutationFn: createA,
    onSuccess: async () => {
      reset({
        username: '',
        password: '',
        repeatpassword: '',
        permissions: Permissions.OTHER
      })
      setTimeout(closeModal, 500)
      await query.refetchQueries({ queryKey: ['acc'] })
    }
  })

  const {
    mutate: updateAccount,
    isSuccess: isSuccessU,
    isPending: isPendingU,
    isError: isErrorU
  } = useMutation({
    mutationFn: updateA,
    onSuccess: async () => {
      setTimeout(closeModal, 500)
      await query.refetchQueries({ queryKey: ['acc'] })
    }
  })

  return (
    <form
      onSubmit={handleSubmit((dataForm: FieldValues, e) => {
        if (data?.id) {
          updateAccount({ data: dataForm, id: data?.id ?? 0 })
        } else {
          createAccount(dataForm)
        }
      })}
      className='bg-white relative shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max w-max flex flex-col gap-0 border-2 border-red-500'
      id={`createForm${data?.id}`}
    >
      <input type='text' />
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='username'
        >
          Nombre de Usuario
        </label>
        <input
          {...register('username', {
            required: {
              value: true,
              message: 'El nombre de usuario es requerido'
            }
          })}
          name='username'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id={`username${data?.id}`}
          form='createForm'
          type='text'
          autoComplete='off'
          defaultValue={data?.username}
          placeholder='Nombre de usuario'
        ></input>
        {errors?.username && (
          <span className='inputError'>
            {errors.username.message as string}
          </span>
        )}
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='password'
        >
          Contraseña
        </label>
        <input
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            }
          })}
          name='password'
          id={`password${data?.id}`}
          form='createForm'
          type='password'
          defaultValue={data?.password}
          className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='******************'
        ></input>
        {errors?.password && (
          <span className='inputError'>
            {errors.password.message as string}
          </span>
        )}
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='repeatpassword'
        >
          Repetir Contraseña
        </label>
        <input
          {...register('repeatpassword', {
            required: {
              value: true,
              message: 'Confirmar la contraseña es requerido'
            },
            validate: (value) => {
              return (
                watch('password') === value || 'Las contraseñas deben coincidir'
              )
            }
          })}
          name='repeatpassword'
          id={`repeatpassword${data?.id}`}
          form='createForm'
          type='password'
          defaultValue={data?.password}
          className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='******************'
        ></input>
        {errors?.repeatpassword && (
          <span className='inputError'>
            {errors.repeatpassword.message as string}
          </span>
        )}
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='permisos'
        >
          Permisos
        </label>
        <select
          {...register('permissions', {
            required: {
              value: true,
              message: 'Los permisos son requeridos'
            },
            validate: (value) => {
              return (
                value !== 'OTHER' || 'Debe seleccionar los permisos adecuados'
              )
            }
          })}
          name='permissions'
          id={`permissions${data?.id}`}
          form='createForm'
          defaultValue={Permissions[data?.permissions ?? 'OTHER']}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value={Permissions.OWN}>Propietario</option>
          <option value={Permissions.ADM}>Administrador</option>
          <option value={Permissions.INS}>Instructor</option>
          <option value={Permissions.MEM}>Alumno</option>
          <option value={Permissions.OTHER}>Otro</option>
        </select>
        {errors?.permissions && (
          <span className='inputError'>
            {errors.permissions.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col'>
        <button
          form={`createForm${data?.id}`}
          className='mb-2 md:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          {data?.id ? 'Actualizar' : 'Crear'}
        </button>
        <span className='w-full flex flex-row items-center justify-center'>
          {(isPendingC || isPendingU) && (
            <p className='w-max text-yellow-400'>
              {data?.id ? 'Actualizando' : 'Creando'} usuario...
            </p>
          )}
          {(isSuccessC || isSuccessU) && (
            <p className='w-max text-green-400'>OK</p>
          )}
          {(isErrorC || isErrorU) && (
            <p className='w-max text-red-400'>Failed!</p>
          )}
        </span>
      </div>
    </form>
  )
}
