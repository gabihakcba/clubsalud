import { type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { type CreateInstructor, type Instructor } from 'utils/types'
import { findAccountByUsername } from 'queries/accounts'
import { createInstructor } from 'queries/instructors'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const idAccount = async (username: string): Promise<number> => {
  try {
    const response = await findAccountByUsername(username)
    return response.data.id
  } catch (error) {
    alert('Usuario no encontrado')
    return -1
  }
}

const formToInstructor = (data: FieldValues, id: number): CreateInstructor => {
  return {
    name: data.name,
    lastName: data.lastName,
    dni: data.dni,
    cuit: data?.cuit ? data.cuit : undefined,
    phoneNumber: data.phoneNumber,
    address: data.address,
    email: data.email,
    degree: data.degree,
    cbu: data?.cbu ? data.cbu : null,
    alias: data?.alias ? data.alias : null,
    accountId: id
  }
}

const create = async (data: FieldValues): Promise<Instructor> => {
  const id = await idAccount(data.accountName as string)
  const newInstructor = formToInstructor(data, id)
  const response = await createInstructor(newInstructor)
  return response.data
}

interface params {
  closeModal: () => void
}

export function CreateInstructorForm({ closeModal }: params): ReactElement {
  const query = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
    // watch
  } = useForm()

  const {
    mutate: mutateC,
    isPending: isPendingC,
    isSuccess: isSuccessC,
    isError: isErrorC
  } = useMutation({
    mutationFn: create,
    onSuccess: async () => {
      await query.resetQueries({ queryKey: ['ins'] })
      reset()
      setTimeout(closeModal, 500)
    },
    onError(error, variables, context) {
      console.log(error)
    }
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutateC(data)
      })}
      className='bg-white relative shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max w-max flex flex-col gap-0 border-2 border-red-500'
      id='createFormIns'
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
          form='createFormIns'
          type='text'
          autoComplete='off'
          placeholder='Nombre'
        ></input>
        {errors?.name && (
          <span className='inputError'>{errors.name.message as string}</span>
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
          form='createFormIns'
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
          form='createFormIns'
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
          form='createFormIns'
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
          form='createFormIns'
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
          form='createFormIns'
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Dirección'
        ></input>
        {errors?.address && (
          <span className='inputError'>{errors.address.message as string}</span>
        )}
      </div>
      <div className='mb-2'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='inscriptionDate'
        >
          E-mail
        </label>
        <input
          {...register('email', {
            required: {
              value: true,
              message: 'Dirección de e-mail es requerida'
            }
          })}
          name='email'
          id='email'
          form='createFormIns'
          type='email'
          placeholder='example@example.com'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
        ></input>
        {errors?.email && (
          <span className='inputError'>{errors.email.message as string}</span>
        )}
      </div>
      <div className='mb-2'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='derivedBy'
        >
          Título
        </label>
        <select
          {...register('degree', {
            required: {
              value: true,
              message: 'Título es requerido'
            }
          })}
          defaultValue=''
          name='degree'
          id='degree'
          form='createFormIns'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value={'true'}>Si</option>
          <option value={'false'}>No</option>
        </select>
        {errors?.degree && (
          <span className='inputError'>{errors.degree.message as string}</span>
        )}
      </div>
      <div className='mb-2'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='afiliateNumber'
        >
          CBU
        </label>
        <input
          {...register('cbu')}
          name='afiliateNumber'
          id='afiliateNumber'
          form='createFormIns'
          type='number'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          placeholder=''
        ></input>
      </div>
      <div className='mb-2'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='afiliateNumber'
        >
          Alias
        </label>
        <input
          {...register('alias')}
          name='alias'
          id='alias'
          form='createFormIns'
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          placeholder=''
        ></input>
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
          form='createFormIns'
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
        <button
          form='createFormIns'
          className='mb-2 md:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Crear
        </button>
        <span className='w-full flex flex-row items-center justify-center'>
          {isPendingC && <p className='w-max text-yellow-400'>Creando...</p>}
          {isSuccessC && <p className='w-max text-green-400'>OK</p>}
          {isErrorC && <p className='w-max text-red-400'>Failed!</p>}
        </span>
      </div>
    </form>
  )
}
