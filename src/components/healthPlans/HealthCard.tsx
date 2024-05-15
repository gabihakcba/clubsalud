import { useState, type ReactElement } from 'react'
import {
  HealthPlanType,
  type HealthPlan,
  type CreateHealthPlan
} from 'utils/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateHealthPlan } from 'queries/health'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

interface params {
  plan: HealthPlan
}
export default function HealthCard({ plan }: params): ReactElement {
  const [selectedHealthPlan, setSelectedHealthPlan] = useState<any>(null)

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
    onSuccess: (data) => {
      query.setQueryData(['health'], (oldData: HealthPlan[]) => {
        const newData = [...oldData]
        const index = newData.findIndex((health) => health.id === data.id)
        newData.splice(index, 1, data)
        return newData
      })
    }
  })

  const {
    register,
    handleSubmit,
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
          defaultValue={plan.type}
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
          defaultValue={plan.paymentPerConsultation}
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

/* <button
          onClick={() => {
            deleteH(plan.id)
          }}
        >
          <Image
            src={delete_}
            alt='E'
            width={20}
            height={20}
          ></Image>
        </button> */
