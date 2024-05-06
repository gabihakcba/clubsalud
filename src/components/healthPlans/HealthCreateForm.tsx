import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { createHealthPlan } from 'queries/health'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type HealthPlan, type CreateHealthPlan } from 'utils/types'
import { HealthPlanType } from 'utils/types'

const plansOptions = (): any[] => {
  const op: any[] = []
  for (const plan in HealthPlanType) {
    op.push(plan)
  }
  return op
}

export default function HealthCreateForm(): ReactElement {
  const query = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: createHealthPlan,
    onSuccess: async (data) => {
      query.setQueryData(['health'], (oldData: HealthPlan[]) => [
        ...oldData,
        data
      ])
      reset()
    }
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm()
  return (
    <form
      action=''
      className='w-full h-full gap-4 pt-4 flex flex-column'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        mutate(data as CreateHealthPlan)
      })}
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
        />
        <label htmlFor='name'>Nombre</label>
      </div>
      <div className='p-float-label'>
        <InputText
          type='text'
          {...register('description')}
          autoComplete='off'
        />
        <label htmlFor='description'>Descripción</label>
      </div>
      <div className='p-float-label'>
        <Dropdown
          value={watch('type')}
          {...register('type', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          options={plansOptions()}
        />
        <label htmlFor='type'>Tipo</label>
      </div>
      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('paymentPerConsultation', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
        />
        <label htmlFor='paymentPerConsultation'>Pago por consulta</label>
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
