import { type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { type CreateMember, type Member, MemberSate } from 'utils/types'
import { findAccountByUsername } from 'queries/accounts'
import { createMember } from 'queries/members'
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

const create = async (data: FieldValues): Promise<Member> => {
  const id = await idAccount(data.accountName as string)
  const newMember = formToMember(data, id)
  const response = await createMember(newMember)
  return response.data
}

interface params {
  closeModal: () => void
}

export function CreateMemberForm({ closeModal }: params): ReactElement {
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
      await query.resetQueries({ queryKey: ['mem'] })
      reset()
      setTimeout(closeModal, 500)
    }
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutateC(data)
      })}
      className='bg-white relative shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max w-max flex flex-col gap-0 border-2 border-red-500'
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
          <span className='inputError'>{errors.address.message as string}</span>
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
        <button
          form='createForm'
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
