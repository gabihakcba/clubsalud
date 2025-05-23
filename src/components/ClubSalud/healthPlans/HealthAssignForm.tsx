'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { getHealthPlans } from 'queries/ClubSalud/health'
import { createHealthSubscribed } from 'queries/ClubSalud/healthSus'
import { getMembers } from 'queries/ClubSalud/members'
import { useState, type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { type HealthPlanSubscribed } from 'utils/ClubSalud/types'

export default function HealthAssignForm(): ReactElement {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const { data: members, isPending: isLoadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const { data: healthPlans, isPending: isLoadingHealthPlans } = useQuery({
    queryKey: ['healthplans'],
    queryFn: async () => {
      return await getHealthPlans()
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
        planId: Number(data.planId),
        afiliateNumber: String(data.afiliateNumber)
      })
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  return (
    <form
      action=''
      className='flex flex-column pt-4 gap-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        create({
          memberId: data.memberId,
          planId: data.planId,
          afiliateNumber: data.afiliateNumber
        })
      })}
    >
      <div className='p-float-label'>
        <Dropdown
          options={members}
          optionLabel='name'
          optionValue='id'
          filter
          filterBy='dni,name'
          id='memberId'
          className='w-full'
          value={selectedMember}
          {...register('memberName', {
            required: { value: true, message: 'Campo requerido' }
          })}
          onChange={(e) => {
            setSelectedMember(e.value)
            setValue('memberId', e.value)
          }}
          loading={isLoadingMembers}
          invalid={errors?.memberName !== undefined}
        />
        <label htmlFor='memberId'>Alumno</label>
      </div>
      <div className='p-float-label'>
        <Dropdown
          options={healthPlans}
          optionLabel='name'
          optionValue='id'
          id='planId'
          filter
          className='w-full'
          value={selectedPlan}
          {...register('planName', {
            required: { value: true, message: 'Campo requerido' }
          })}
          onChange={(e) => {
            setSelectedPlan(e.value)
            setValue('planId', e.value)
          }}
          loading={isLoadingHealthPlans}
          invalid={errors?.planName !== undefined}
        />
        <label htmlFor='planId'>Obra social</label>
      </div>
      <FloatLabel>
        <InputText {...register('afiliateNumber', { required: true })} />
        <label htmlFor=''>Número de afiliado</label>
      </FloatLabel>
      <Button
        type='submit'
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        size='small'
        loading={isPending}
      />
      {isPending && <span className='text-yellow-500'>Creando...</span>}
      {isSuccess && <span className='text-green-500'>Listo!</span>}
      {isError && <span className='text-yellow-500'>Error!</span>}
    </form>
  )
}
