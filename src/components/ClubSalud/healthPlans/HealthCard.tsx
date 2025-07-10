import { useEffect, useState, type ReactElement } from 'react'
import {
  HealthPlanType,
  type HealthPlan,
  type CreateHealthPlan
} from 'utils/ClubSalud/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateHealthPlan } from 'queries/ClubSalud/health'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'

interface params {
  plan: HealthPlan
}
export default function HealthCard({ plan }: params): ReactElement {
  const [selectedHealthPlan, setSelectedHealthPlan] = useState<any>(null)
  const [paymentPerConsultation, setPaymentPerConsultation] = useState<number>(
    plan.paymentPerConsultation
  )

  const plansOptions = (): any[] => {
    const op: any[] = []
    for (const plan in HealthPlanType) {
      op.push({ label: plan })
    }
    return op
  }

  const query = useQueryClient()

  const { mutate: update, isPending } = useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: number
      data: FieldValues
    }): Promise<HealthPlan> => {
      return await updateHealthPlan({
        id,
        ...(data as CreateHealthPlan)
      })
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['health'] })
    }
  })

  useEffect(() => {
    setValue('paymentPerConsultation', plan.paymentPerConsultation)
    setSelectedHealthPlan(HealthPlanType[plan.type])
    setValue('type', HealthPlanType[plan.type])
  }, [plan])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  return (
    <form
      action=''
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        update({ id: plan.id, data })
      })}
      className='flex flex-column pt-4 gap-4'
    >
      <div className='p-float-label'>
        <InputText
          type='text'
          {...register('name', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.name !== undefined}
          autoComplete='off'
          defaultValue={plan.name}
        />
        <label htmlFor='name'>Nombre</label>
      </div>
      <div className='p-float-label'>
        <InputText
          type='text'
          {...register('description')}
          autoComplete='off'
          defaultValue={plan.description}
        />
        <label htmlFor='description'>Descripción</label>
      </div>
      <div className='p-float-label'>
        <Dropdown
          value={selectedHealthPlan}
          {...register('type', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          className='w-full'
          options={plansOptions()}
          optionLabel='label'
          optionValue='label'
          onChange={(e) => {
            setSelectedHealthPlan(e.value)
          }}
        />
        <label htmlFor='type'>Tipo</label>
      </div>
      <div className='p-float-label'>
        <InputNumber
          value={paymentPerConsultation}
          {...register('paymentPerConsultation', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          min={0}
          max={99999}
          className='w-full'
          onChange={(e) => {
            setValue('paymentPerConsultation', e.value)
            setPaymentPerConsultation(e.value ?? 0)
          }}
        />
        <label htmlFor='type'>Pago por consulta</label>
      </div>

      <Button
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPending}
      />
    </form>
  )
}
