import { useEffect, type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import {
  type CreateMember,
  MemberSate,
  Permissions,
  type CreateAccount
} from 'utils/types'
import { createAccount, deleteAccount } from 'queries/accounts'
import { createMember } from 'queries/members'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'

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

export function CreateMemberForm(): ReactElement {
  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm()

  const {
    mutate: createAcc,
    isPending: isPendingAccount,
    data: newAccount
  } = useMutation({
    mutationFn: async (data: FieldValues) => {
      return await createAccount(data as CreateAccount)
    },
    onSuccess: async (data) => {
      const dataForm = getValues()
      mutateC({ data: dataForm, id: data.id })
      return data
    }
  })

  const {
    mutate: mutateC,
    isPending: isPendingMember,
    isSuccess: isSuccessMember,
    isError: isErrorMember
  } = useMutation({
    mutationFn: async ({ data, id }: { data: FieldValues; id: number }) => {
      const newMember = formToMember(data, id)
      await createMember(newMember)
    },
    onSuccess: async () => {
      await query.resetQueries({ queryKey: ['mem'] })
      await query.refetchQueries({ queryKey: ['acc'] })
    },
    onError: async () => {
      console.log('newAccount: ', newAccount)
      if (newAccount) {
        const deleted = await deleteAccount(newAccount.id)
        console.log('deleted: ', deleted)
      }
    }
  })

  useEffect(() => {
    setValue('permissions', Permissions.MEM)
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        createAcc({
          username: data.username,
          password: data.password,
          permissions: [Permissions[data.permissions]]
        })
      })}
      className='relative rounded h-max w-max flex flex-column pt-4 gap-4'
      id='createForm'
    >
      {/**
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
          value={Permissions.MEM}
          className='w-full'
        />
        <label htmlFor='permissions'>Permisos</label>
      </div>

      {/**
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
          id='name'
          form='createForm'
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
          form='createForm'
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
          form='createForm'
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
          form='createForm'
          type='number'
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
          form='createForm'
          type='number'
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
          form='createForm'
          type='text'
          autoComplete='off'
          invalid={errors?.address !== undefined}
          className='w-full'
        />
        <label htmlFor='address'>Dirección</label>
      </div>
      <div className='p-float-label'>
        <Calendar
          value={watch('inscriptionDate')}
          {...register('inscriptionDate', {
            required: {
              value: true,
              message: 'Fecha de inscripción es requerida'
            }
          })}
          name='inscriptionDate'
          id='inscriptionDate'
          dateFormat='dd/mm/yy'
          placeholder='Fecha de inscripción'
          invalid={errors?.inscriptionDate !== undefined}
          className='w-full'
        />
        <label htmlFor='inscriptionDate'>Fecha de inscripción</label>
      </div>
      <div className='p-float-label'>
        <InputText
          {...register('derivedBy', {
            required: {
              value: true,
              message: 'Derivación es requerida'
            }
          })}
          form='createForm'
          type='text'
          autoComplete='off'
          invalid={errors?.derivedBy !== undefined}
          className='w-full'
        />
        <label htmlFor='derivedBy'>Derivado por</label>
      </div>
      <div className='p-float-label'>
        <InputText
          {...register('afiliateNumber', {
            required: {
              value: true,
              message: 'Número de afiliado requerido'
            }
          })}
          form='createForm'
          type='number'
          autoComplete='off'
          invalid={errors?.afiliateNumber !== undefined}
          className='w-full'
        />
        <label htmlFor='afiliateNumber'>Número de historia clínica (ID)</label>
      </div>

      <div className='flex flex-column gap-0'>
        <Button
          form='createForm'
          type='submit'
          label='Crear'
          icon='pi pi-upload'
          iconPos='right'
          loading={isPendingMember || isPendingAccount}
          className='w-full'
        />
        <small>
          {isSuccessMember && <p className='w-max text-green-400'>OK</p>}
          {isErrorMember && <p className='w-max text-red-400'>Failed!</p>}
        </small>
      </div>
    </form>
  )
}
