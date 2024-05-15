import { useState, type ReactElement, useEffect } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import {
  type CreateMember,
  type Member,
  MemberSate,
  type Account
} from 'utils/types'
import { findAccountByUsername } from 'queries/accounts'
import { createMember } from 'queries/members'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

const idAccount = async (username: string): Promise<number> => {
  try {
    const response = await findAccountByUsername(username)
    return response.id
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
  return await createMember(newMember)
}

export function CreateMemberForm(): ReactElement {
  const [accounts, setAccounts] = useState<Account[] | null | undefined>(null)
  const [selected, setSelected] = useState<any>(null)

  const query = useQueryClient()

  useEffect(() => {
    setAccounts(query.getQueryData(['acc']))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
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
    }
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutateC(data)
        console.log(data.inscriptionDate)
        console.log(data.inscriptionDate.toISOString())
      })}
      className='relative rounded h-max w-max flex flex-column pt-4 gap-4'
      id='createForm'
    >
      <div className='p-float-label'>
        <Dropdown
          className='w-full'
          value={selected}
          options={accounts ?? []}
          {...register('accountName', {
            required: {
              value: true,
              message: 'Nombre de usuario requerido'
            }
          })}
          name='accountName'
          id='accountName'
          form='createForm'
          optionLabel='username'
          invalid={errors?.accountName !== undefined}
          checkmark={true}
          onChange={(e) => {
            setSelected(e.value)
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
          id='name'
          form='createForm'
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
          form='createForm'
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
          form='createForm'
          type='number'
          autoComplete='off'
          invalid={errors?.dni !== undefined}
        />
        <label htmlFor='dni'>DNI</label>
      </div>
      <div className='p-float-label'>
        <InputText
          {...register('cuit')}
          form='createForm'
          type='number'
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
        ></InputText>
        <label htmlFor='afiliateNumber'>Número de afiliado</label>
      </div>

      <div className='flex flex-column gap-0'>
        <Button
          form='createForm'
          type='submit'
          label='Crear'
          icon='pi pi-upload'
          iconPos='right'
          loading={isPendingC}
        />
        <small>
          {isSuccessC && <p className='w-max text-green-400'>OK</p>}
          {isErrorC && <p className='w-max text-red-400'>Failed!</p>}
        </small>
      </div>
    </form>
  )
}
