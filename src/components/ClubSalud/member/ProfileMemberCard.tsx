import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { confirmDialog } from 'primereact/confirmdialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { deleteMember, updateMember } from 'queries/ClubSalud/members'
import { useEffect, useState, type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { arg2Date } from 'utils/ClubSalud/dates'
import {
  type Account,
  type CreateMember,
  MemberSate,
  type Member
} from 'utils/ClubSalud/types'

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

export default function ProfileMemberCard({
  member
}: {
  member: Member
}): ReactElement {
  const query = useQueryClient()

  const [editF, setEditF] = useState<boolean>(false)
  const [selected, setSelected] = useState<MemberSate | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm()

  useEffect(() => {
    setValue('id', member.id)
    setValue('name', member.name)
    setValue('lastName', member.lastName)
    setValue('dni', member.dni)
    setValue('cuit', member.cuit ?? null)
    setValue('phoneNumber', member.phoneNumber)
    setValue('address', member.address)
    setValue('inscriptionDate', arg2Date(member.inscriptionDate))
    setValue(
      'cancelationDate',
      member.cancelationDate ? arg2Date(member.cancelationDate) : null
    )
    setValue('cancelationReason', member.cancelationReason ?? null)
    setValue('derivedBy', member.derivedBy)
    setValue('afiliateNumber', member.afiliateNumber)
    setValue('state', MemberSate[member.state])
    setSelected(MemberSate[member.state])
    setValue('remainingClasses', member.remainingClasses ?? null)
  }, [member])

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

  return (
    <form
      action=''
      id={`member${member?.id}`}
      onSubmit={handleSubmit((data) => {
        mutateU({ id: member.id, data })
      })}
      className='flex flex-column max-w-max'
    >
      <div className='flex flex-row justify-content-end align-items-center gap-4'>
        <Button
          onClick={() => {
            setEditF((prev: boolean) => !prev)
          }}
          type='button'
          size='small'
          icon='pi pi-pen-to-square'
          className='align-self-end'
        />
      </div>
      <div className='flex flex-column lg:flex-row pt-4'>
        <ul
          role='list'
          className='flex flex-column gap-4'
        >
          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='text'
              value={String(member.id)}
              className='font-semibold'
              disabled
            />
            <label className='font-semibold'>ID</label>
          </li>
          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='text'
              id='name'
              form={`member${member?.id}`}
              defaultValue={member?.name}
              {...register('name', {
                required: {
                  value: true,
                  message: 'El nombre requerido'
                }
              })}
              disabled={!editF}
              invalid={errors?.name !== undefined}
            />
            <label className='font-semibold'>Nombre</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='text'
              id='lastName'
              form={`member${member?.id}`}
              defaultValue={member?.lastName}
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'Apellido es requerido'
                }
              })}
              disabled={!editF}
              invalid={errors?.lastName !== undefined}
            />
            <label className='font-semibold'>Apellido</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='number'
              id='dni'
              form={`member${member?.id}`}
              defaultValue={Number(member?.dni)}
              {...register('dni', {
                required: {
                  value: true,
                  message: 'DNI es requerido'
                }
              })}
              disabled={!editF}
              invalid={errors?.dni !== undefined}
            />
            <label className='font-semibold'>DNI</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='number'
              id='cuit'
              form={`member${member?.id}`}
              defaultValue={member?.cuit?.toString()}
              {...register('cuit')}
              disabled={!editF}
              invalid={errors?.cuit !== undefined}
            />
            <label className='font-semibold'>CUIT</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <Calendar
              id='birthday'
              value={
                watch('birthday') ?? arg2Date(member.birthday)
              }
              {...register('birthday', {
                required: {
                  value: true,
                  message: 'Fecha es requerida'
                }
              })}
              disabled={!editF}
              invalid={errors?.birthday !== undefined}
              dateFormat='dd/mm/yy'
            />
            <label className='font-semibold'>Fecha de nacimiento</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='number'
              id='phoneNumber'
              form={`member${member?.id}`}
              defaultValue={Number(member?.phoneNumber)}
              required
              {...register('phoneNumber', {
                required: {
                  value: true,
                  message: 'Número de teléfono es requerido'
                }
              })}
              disabled={!editF}
              invalid={errors?.phoneNumber !== undefined}
            />
            <label className='font-semibold'>Número de teléfono</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='text'
              id='address'
              form={`member${member?.id}`}
              defaultValue={member?.address}
              {...register('address', {
                required: {
                  value: true,
                  message: 'Dirección es requerida'
                }
              })}
              disabled={!editF}
              invalid={errors?.address !== undefined}
            />
            <label className='font-semibold'>Dirección</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <Calendar
              id='inscriptionDate'
              // form={`member${member.id}`}
              value={
                watch('inscriptionDate') ?? arg2Date(member.inscriptionDate)
              }
              {...register('inscriptionDate', {
                required: {
                  value: true,
                  message: 'Fecha es requerida'
                }
              })}
              disabled={!editF}
              invalid={errors?.inscriptionDate !== undefined}
              dateFormat='dd/mm/yy'
            />
            <label className='font-semibold'>Fecha de inscripción</label>
          </li>
        </ul>

        <ul
          role='list'
          className='flex flex-column gap-4'
        >
          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <Calendar
              id='cancelationDate'
              value={
                watch('cancelationDate') ??
                (member.cancelationDate && arg2Date(member.cancelationDate)) ??
                null
              }
              {...register('cancelationDate')}
              disabled={!editF}
              invalid={errors?.cancelationDate !== undefined}
              dateFormat='dd/mm/yy'
            />
            <label className='font-semibold'>Fecha de cancelación</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='text'
              id='cancelationReason'
              form={`member${member?.id}`}
              defaultValue={member?.cancelationReason ?? ''}
              {...register('cancelationReason')}
              disabled={!editF}
              invalid={errors?.cancelationReason !== undefined}
            />
            <label className='font-semibold'>Motivo de cancelación</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='text'
              id='derivedBy'
              form={`member${member?.id}`}
              defaultValue={member?.derivedBy}
              {...register('derivedBy', {
                required: {
                  value: true,
                  message: 'Derivación es requerida'
                }
              })}
              disabled={!editF}
              invalid={errors?.derivedBy !== undefined}
            />
            <label className='font-semibold'>Derivado por</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='number'
              id='afiliateNumber'
              form={`member${member?.id}`}
              defaultValue={member?.afiliateNumber.toString()}
              {...register('afiliateNumber', {
                required: {
                  value: true,
                  message: 'Numero de afiliado es requerido'
                }
              })}
              disabled={!editF}
              invalid={errors?.afiliateNumber !== undefined}
            />
            <label className='font-semibold'>Número de historia clínica (ID)</label>
          </li>

          <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
            <InputText
              type='number'
              id='remainingClasses'
              form={`member${member?.id}`}
              defaultValue={member?.remainingClasses?.toString()}
              {...register('remainingClasses')}
              disabled={!editF}
              invalid={errors?.remainingClasses !== undefined}
            />
            <label className='font-semibold'>Clases remanentes</label>
          </li>

          <li className='p-float-label justify-content-between mb-2'>
            <Dropdown
              id='state'
              form={`member${member?.id}`}
              value={selected}
              options={[
                { text: 'Activo', value: MemberSate.ACTIVE },
                { text: 'Inactivo', value: MemberSate.INACTIVE },
                { text: 'Otro', value: MemberSate.OTHER }
              ]}
              optionLabel='text'
              optionValue='value'
              {...register('state')}
              onChange={(e) => {
                setValue('state', e.value)
                setSelected(e.value as MemberSate)
              }}
              disabled={!editF}
              invalid={errors?.state !== undefined}
            />
            <label className='font-semibold'>Estado</label>
          </li>
        </ul>
      </div>
      {editF && (
        <div className='flex flex-row justify-content-end w-full gap-4'>
          <div className='w-max flex flex-column align-items-end'>
            <Button
              className='dark-blue-border-button'
              form={`member${member?.id}`}
              type='submit'
              label='Enviar'
              icon='pi pi-upload'
              iconPos='right'
              size='small'
              loading={isPendingU}
            />
            {isSuccessU && <p className='w-max text-green-400'>Listo!</p>}
            {isErrorU && <p className='w-max text-red-400'>Error!</p>}
          </div>
          <div className='w-max flex flex-col items-end'>
            <Button
              type='button'
              label='Eliminar'
              icon='pi pi-trash'
              iconPos='right'
              size='small'
              severity='danger'
              loading={isPendingD}
              onClick={async () => {
                confirmDialog({
                  message: 'Confirmación de acción',
                  header: 'Eliminar perfil de alumno',
                  icon: 'pi pi-info-circle',
                  defaultFocus: 'reject',
                  acceptClassName: 'p-button-danger',
                  acceptLabel: 'Si',
                  accept: () => {
                    mutateD(member?.id)
                  }
                })
              }}
            />
            {isSuccessD && <p className='w-max text-green-400'>OK</p>}
            {isErrorD && <p className='w-max text-red-400'>Failed!</p>}
          </div>
        </div>
      )}
    </form>
  )
}
