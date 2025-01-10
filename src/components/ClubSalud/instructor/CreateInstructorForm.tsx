import { useState, type ReactElement, useEffect } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import {
  Permissions,
  type CreateInstructor,
  type CreateAccount
} from 'utils/ClubSalud/types'
import { createAccount, deleteAccount } from 'queries/ClubSalud/accounts'
import { createInstructor } from 'queries/ClubSalud/instructors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputText } from 'primereact/inputtext'
import { ToggleButton } from 'primereact/togglebutton'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'

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
    cbu: data?.cbu,
    alias: data?.alias ? data.alias : null,
    accountId: id
  }
}

export function CreateInstructorForm(): ReactElement {
  const [selectedDegree, setSelectedDegree] = useState<boolean>(false)
  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues
  } = useForm()

  const {
    mutate: mutateC,
    isPending: isPendingC,
    isSuccess: isSuccessC,
    isError: isErrorC
  } = useMutation({
    mutationFn: async ({ data, id }: { data: FieldValues; id: number }) => {
      const newInstructor = formToInstructor(data, id)
      return await createInstructor(newInstructor)
    },
    onSuccess: async () => {
      await query.resetQueries({ queryKey: ['ins'] })
      await query.refetchQueries({ queryKey: ['acc'] })
    },
    onError: async () => {
      if (newAccount) {
        await deleteAccount(newAccount.id)
      }
    }
  })

  const {
    mutate: mutateCreateAccoount,
    isError: isErrorCreateAccount,
    isPending: isPendingAccount,
    data: newAccount
  } = useMutation({
    mutationFn: async (data: FieldValues) => {
      return await createAccount(data as CreateAccount)
    },
    onSuccess: async (data) => {
      const dataForm = getValues()
      mutateC({ data: dataForm, id: data.id })
    }
  })

  useEffect(() => {
    setValue('permissions', Permissions.INS)
    setValue('degree', false)
  }, [])

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutateCreateAccoount({
          username: data.username,
          password: data.password,
          permissions: [Permissions[data.permissions]]
        })
        if (isErrorCreateAccount) {
          alert('No se pudo crear la cuenta')
        }
        if (isErrorC) {
          alert('No se pudo crear el perfil de profesor')
        }
      })}
      className='relative rounded h-max w-max flex flex-column gap-4 pt-4'
      id='createFormIns'
    >
      {/*
       * Account
       */}

      <div className='p-float-label'>
        <InputText
          id='username'
          type='text'
          {...register('username', {
            required: {
              value: true,
              message: 'El nombre de usuario es requerido'
            }
          })}
          autoComplete='off'
          form='createForm'
          invalid={errors?.username !== undefined}
          className='w-full'
        />
        <label htmlFor='username'>Nombre de usuario</label>
      </div>

      <div className='p-float-label'>
        <Password
          id='password'
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            }
          })}
          onChange={(e) => {
            setValue('password', e.target.value)
          }}
          autoComplete='off'
          form='createForm'
          invalid={errors?.password !== undefined}
          className='w-full'
          toggleMask
          feedback={false}
        />
        <label htmlFor='password'>Contraseña</label>
      </div>

      <div className='p-float-label'>
        <Password
          id='repeatpassword'
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
          onChange={(e) => {
            setValue('repeatpassword', e.target.value)
          }}
          autoComplete='off'
          form='createForm'
          invalid={errors?.repeatpassword !== undefined}
          className='w-full'
          toggleMask
          feedback={false}
        />
        <label htmlFor='repeatpassword'>Repetir Contraseña</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('permissions')}
          disabled
          value={Permissions.INS}
          className='w-full'
        />
        <label htmlFor='permissions'>Permisos</label>
      </div>

      {/*
       *
       */}

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
          className='w-full'
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
          className='w-full'
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
          className='w-full'
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
          className='w-full'
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
          className='w-full'
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
          className='w-full'
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
          className='w-full'
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
          className='w-full'
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
          className='w-full'
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
          loading={isPendingC || isPendingAccount}
          className='w-full'
        />
        <small className='w-full flex flex-row align-items-center justify-content-center'>
          {isSuccessC && <p className='w-max text-green-400'>LIsto!</p>}
          {isErrorC && <p className='w-max text-red-400'>Error!</p>}
        </small>
      </div>
    </form>
  )
}
