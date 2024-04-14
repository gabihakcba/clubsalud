'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createHealthSubscribed } from 'queries/healthSus'
import { getMembers } from 'queries/members'
import { type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { type HealthPlanSubscribed, type HealthPlan } from 'utils/types'

export default function HealthAssignForm(): ReactElement {
  const query = useQueryClient()

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const {
    mutate: create,
    isPending,
    isError,
    isSuccess
  } = useMutation({
    mutationFn: async (data: FieldValues): Promise<HealthPlanSubscribed> => {
      return await createHealthSubscribed({
        memberId: Number(data.memberId),
        planId: Number(data.planId)
      })
    }
  })

  const healthPlans: HealthPlan[] | undefined = query.getQueryData(['health'])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  return (
    <form
      action=''
      className='bg-white p-2 rounded flex flex-col'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        create(data)
      })}
    >
      <h2 className='text-xl font-bold'>Asignar suscripcion</h2>
      <hr className='m-2' />
      <div className='flex flex-col sm:flex-row gap-4 items-center'>
        <label htmlFor=''>Alumno</label>
        <input
          type='text'
          placeholder='Filtrar por nombre'
          className='border p-1'
          {...register('filterMember')}
        />
        <div>
          <select
            id='memberId'
            className='rounded p-1'
            {...register('memberId', {
              required: { value: true, message: 'Campo requerido' }
            })}
          >
            <option value=''>Select</option>
            {members
              ?.filter((member) =>
                member.name
                  .toUpperCase()
                  .includes((watch('filterMember') as string)?.toUpperCase())
              )
              .map((member, index) => (
                <option
                  value={member.id}
                  key={index}
                >
                  {member.name}
                </option>
              ))}
          </select>
          {errors?.memberId && (
            <span className='inputError text-sm'>
              {errors.memberId.message as string}
            </span>
          )}
        </div>
      </div>
      <hr className='m-2' />
      <div className='flex flex-col sm:flex-row gap-4 items-center'>
        <label htmlFor=''>Obra social</label>
        <input
          type='text'
          placeholder='Filtrar por nombre'
          className='border p-1'
          {...register('filterPlan')}
        />
        <div>
          <select
            id='planId'
            className='rounded p-1'
            {...register('planId', {
              required: { value: true, message: 'Campo requerido' }
            })}
          >
            <option value=''>Select</option>
            {healthPlans
              ?.filter((health) =>
                health.name.includes(
                  (watch('filterPlan') as string)?.toUpperCase()
                )
              )
              .map((health, index) => (
                <option
                  value={health.id}
                  key={index}
                >
                  {health.name}
                </option>
              ))}
          </select>
          {errors?.planId && (
            <span className='inputError text-sm'>
              {errors.planId.message as string}
            </span>
          )}
        </div>
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <button
          className='blueButtonForm p-1 mt-4 w-full'
          type='submit'
        >
          Enviar
        </button>
        {isPending && <span className='text-yellow-500'>Creando...</span>}
        {isSuccess && <span className='text-green-500'>Listo!</span>}
        {isError && <span className='text-yellow-500'>Error!</span>}
      </div>
    </form>
  )
}
