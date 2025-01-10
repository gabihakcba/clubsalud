import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteInstructor, updateInstructor } from 'queries/ClubSalud/instructors'
import { useState, type ReactElement, useEffect } from 'react'
import {
  type Instructor,
  type CreateInstructor,
  type Account
} from 'utils/ClubSalud/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { ToggleButton } from 'primereact/togglebutton'
import { confirmDialog } from 'primereact/confirmdialog'

interface param {
  instructor: Instructor
}
export default function InstructorCard({ instructor }: param): ReactElement {
  const [editF, setEditF] = useState<boolean>(false)
  const [selected, setSelected] = useState<boolean | undefined>(undefined)

  const query = useQueryClient()

  useEffect(() => {
    setValue('degree', instructor.degree)
    setValue('name', instructor.name)
    setValue('lastName', instructor.lastName)
    setValue('dni', instructor.dni)
    setValue('cuit', instructor?.cuit ?? null)
    setValue('phoneNumber', instructor.phoneNumber)
    setValue('address', instructor.address)
    setValue('email', instructor.email)
    setValue('cbu', instructor?.cbu ?? null)
    setValue('alias', instructor?.alias ?? null)
    setSelected(instructor.degree)
  }, [])

  const {
    mutate: mutateC,
    isError: isErrorC,
    isSuccess: isSuccessC,
    isPending: isPendingC
  } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FieldValues }) => {
      const dataInstructor: CreateInstructor = data as CreateInstructor
      const newInstructor: Instructor = {
        id,
        ...dataInstructor
      }
      return await updateInstructor(newInstructor)
    },
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
    mutationFn: async ({ id }: { id: number }) => {
      return await deleteInstructor(id)
    },
    onSuccess: () => {
      query.setQueryData(
        ['account', String(instructor.accountId)],
        (oldData: Account) => {
          return { ...oldData, instructorAccount: null }
        }
      )
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  return (
    <>
      {instructor && (
        <form
          action=''
          id={`member${instructor?.id}`}
          onSubmit={handleSubmit((data) => {
            mutateC({ id: Number(instructor.id), data })
          })}
          className='flex flex-column max-w-max'
        >
          <Button
            onClick={() => {
              setEditF((prev: boolean) => !prev)
            }}
            type='button'
            icon='pi pi-pen-to-square'
            size='small'
            className='align-self-end'
          />
          <div className='flex flex-column lg:flex-row pt-4'>
            <ul
              role='list'
              className='flex flex-column gap-4'
            >
              <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
                <InputText
                  type='text'
                  id='id'
                  className='font-semibold'
                  defaultValue={instructor.id}
                  disabled
                />
                <label
                  htmlFor='id'
                  className='font-semibold'
                >
                  ID
                </label>
              </li>

              <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
                <InputText
                  type='text'
                  id='name'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={instructor?.name}
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'El nombre requerido'
                    }
                  })}
                  disabled={!editF}
                  invalid={errors?.name !== undefined}
                />
                <label
                  htmlFor='name'
                  className='font-semibold'
                >
                  Nombre
                </label>
              </li>

              <li className='p-float-label flex flex-row align--items-center justify-content-between w-full mb-2'>
                <InputText
                  type='text'
                  id='lastName'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={instructor?.lastName}
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: 'Apellido es requerido'
                    }
                  })}
                  disabled={!editF}
                  invalid={errors?.lastName !== undefined}
                />
                <label
                  htmlFor='lastName'
                  className='font-semibold'
                >
                  Apellido
                </label>
              </li>

              <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
                <InputText
                  type='number'
                  id='dni'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={Number(instructor?.dni)}
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
                  form={`member${instructor?.id}`}
                  defaultValue={
                    instructor?.cuit ? Number(instructor?.cuit) : undefined
                  }
                  {...register('cuit')}
                  disabled={!editF}
                  invalid={errors?.cuit !== undefined}
                />
                <label className='font-semibold'>CUIT</label>
              </li>

              <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
                <InputText
                  type='number'
                  id='phoneNumber'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={instructor?.phoneNumber.toString()}
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
            </ul>

            <ul
              role='list'
              className='flex flex-column gap-4'
            >
              <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
                <InputText
                  type='text'
                  id='address'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={instructor?.address}
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
                <InputText
                  type='email'
                  id='email'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={instructor?.email}
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Dirección de e-mail es requerida'
                    }
                  })}
                  disabled={!editF}
                  invalid={errors?.email !== undefined}
                />
                <label className='font-semibold'>E-mail</label>
              </li>

              <li className='flex flex-row align-items-center w-full mb-2'>
                <label className='font-semibold flex-grow-1'>Título</label>
                <ToggleButton
                  id='degree'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  checked={selected}
                  {...register('degree')}
                  onChange={(e) => {
                    setSelected(e.value)
                    setValue('degree', e.value)
                  }}
                  disabled={!editF}
                  invalid={errors?.degree !== undefined}
                />
              </li>

              <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
                <InputText
                  type='number'
                  id='cbu'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={instructor?.cbu?.toString()}
                  {...register('cbu')}
                  disabled={!editF}
                  invalid={errors?.cbu !== undefined}
                />
                <label className='font-semibold'>CBU</label>
              </li>

              <li className='p-float-label flex flex-row align-items-center justify-content-between w-full mb-2'>
                <InputText
                  type='text'
                  id='alias'
                  className='font-semibold'
                  form={`member${instructor?.id}`}
                  defaultValue={instructor?.alias ?? ''}
                  {...register('alias')}
                  disabled={!editF}
                  invalid={errors?.alias !== undefined}
                />
                <label className='font-semibold'>Alias</label>
              </li>
            </ul>
          </div>
          {editF && (
            <div className='flex flex-row justify-content-end w-full gap-4'>
              <div className='w-max flex flex-column align-items-end'>
                <Button
                  form={`member${instructor?.id}`}
                  type='submit'
                  label='Enviar'
                  icon='pi pi-upload'
                  iconPos='right'
                  loading={isPendingC}
                  size='small'
                />
                {isSuccessC && <p className='w-max text-green-400'>Listo!</p>}
                {isErrorC && <p className='w-max text-red-400'>Error!</p>}
              </div>

              <div className='w-max flex flex-column align-items-end'>
                <Button
                  type='button'
                  label='Eliminar'
                  icon='pi pi-trash'
                  iconPos='right'
                  loading={isPendingD}
                  severity='danger'
                  size='small'
                  onClick={() => {
                    confirmDialog({
                      message: 'Confirmación de acción',
                      header: 'Eliminar perfil de profesor',
                      icon: 'pi pi-info-circle',
                      defaultFocus: 'reject',
                      acceptClassName: 'p-button-danger',
                      acceptLabel: 'Si',
                      accept: () => {
                        mutateD({ id: instructor?.id })
                      }
                    })
                  }}
                />
                {isSuccessD && <p className='w-max text-green-400'>Listo!</p>}
                {isErrorD && <p className='w-max text-red-400'>Error!</p>}
              </div>
            </div>
          )}
        </form>
      )}
    </>
  )
}
