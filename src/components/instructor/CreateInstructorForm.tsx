import { useState, type ReactElement, useEffect } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import {
  type Account,
  type CreateInstructor,
  type Instructor
} from 'utils/types'
import { findAccountByUsername } from 'queries/accounts'
import { createInstructor } from 'queries/instructors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { ToggleButton } from 'primereact/togglebutton'
import { Button } from 'primereact/button'

const idAccount = async (username: string): Promise<number> => {
  try {
    const response = await findAccountByUsername(username)
    return response.id
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
    cuit: data?.cuit ? data.cuit : null,
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
  return await createInstructor(newInstructor)
}

export function CreateInstructorForm(): ReactElement {
  const [accounts, setAccounts] = useState<Account[] | null | undefined>([])
  const [selectedDegree, setSelectedDegree] = useState<boolean>(false)
  const [accselected, setAccselected] = useState<any>(null)

  const query = useQueryClient()

  useEffect(() => {
    setAccounts(query.getQueryData(['acc']))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  const {
    mutate: mutateC,
    isPending: isPendingC,
    isSuccess: isSuccessC,
    isError: isErrorC
  } = useMutation({
    mutationFn: create,
    onSuccess: async (data) => {
      await query.resetQueries({ queryKey: ['ins'] })
      reset()
    }
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutateC(data)
      })}
      className='relative rounded h-max w-max flex flex-column gap-4 pt-4'
      id='createFormIns'
    >
      <div className='p-float-label'>
        <Dropdown
          className='w-full'
          value={accselected}
          options={accounts ?? []}
          {...register('accountName', {
            required: {
              value: true,
              message: 'Nombre de usuario requerido'
            }
          })}
          form='createFormIns'
          optionLabel='username'
          invalid={errors?.accountName !== undefined}
          checkmark={true}
          onChange={(e) => {
            setAccselected(e.value)
          }}
          filter
        />
        <label htmlFor='accountName'>Cuenta asociada</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('name', {
            required: {
              value: true,
              message: 'El nombre es requerido'
            }
          })}
          form='createFormIns'
          type='text'
          autoComplete='off'
          invalid={errors?.name !== undefined}
        />
        <label htmlFor='name'>Nombre</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('lastName', {
            required: {
              value: true,
              message: 'El apellido es requerido'
            }
          })}
          form='createFormIns'
          type='text'
          autoComplete='off'
          invalid={errors?.lastName !== undefined}
        />
        <label htmlFor='lastName'>Apellido</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('dni', {
            required: {
              value: true,
              message: 'DNI es requerido'
            }
          })}
          form='createFormIns'
          type='number'
          autoComplete='off'
          invalid={errors?.dni !== undefined}
        />
        <label htmlFor='dni'>DNI</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('cuit')}
          form='createFormIns'
          type='number'
          autoComplete='off'
          invalid={errors?.cuit !== undefined}
        />
        <label htmlFor='cuit'>CUIT</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('phoneNumber', {
            required: {
              value: true,
              message: 'Número de telefono es requerido'
            }
          })}
          form='createFormIns'
          type='number'
          autoComplete='off'
          invalid={errors?.phoneNumber !== undefined}
        />
        <label htmlFor='phoneNumber'>Número de teléfono</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('address', {
            required: {
              value: true,
              message: 'Dirección es requerida'
            }
          })}
          form='createFormIns'
          type='text'
          autoComplete='off'
          invalid={errors?.address !== undefined}
        />
        <label htmlFor='address'>Dirección</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('email', {
            required: {
              value: true,
              message: 'Dirección de e-mail es requerida'
            }
          })}
          form='createFormIns'
          type='email'
          invalid={errors?.email !== undefined}
        />
        <label htmlFor='email'>E-mail</label>
      </div>

      <div className='flex flex-row align-items-center'>
        <label
          htmlFor='degree'
          className='flex-grow-1'
        >
          Título
        </label>
        <ToggleButton
          defaultChecked={false}
          checked={selectedDegree}
          {...register('degree')}
          form='createFormIns'
          onLabel='Si'
          onIcon='pi pi-check'
          offLabel='No'
          offIcon='pi pi-times'
          iconPos='right'
          onChange={(e) => {
            setSelectedDegree(e.value)
            setValue('degree', e.value)
          }}
          invalid={errors?.degree !== undefined}
        />
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('cbu')}
          form='createFormIns'
          type='number'
          invalid={errors?.cbu !== undefined}
        />
        <label htmlFor='cbu'>CBU</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('alias')}
          form='createFormIns'
          type='text'
          autoComplete='off'
          invalid={errors?.alias !== undefined}
        />
        <label htmlFor='alias'>Alias</label>
      </div>

      <div className='flex flex-column'>
        <Button
          form='createFormIns'
          type='submit'
          label='Crear'
          icon='pi pi-upload'
          iconPos='right'
          loading={isPendingC}
        />
        <small className='w-full flex flex-row align-items-center justify-content-center'>
          {isSuccessC && <p className='w-max text-green-400'>LIsto!</p>}
          {isErrorC && <p className='w-max text-red-400'>Error!</p>}
        </small>
      </div>
    </form>
  )
}
