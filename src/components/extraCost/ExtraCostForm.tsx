import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { createExtraCost } from 'queries/extraCost'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type CreateExtraCost } from 'utils/types'

export default function ExtraCostForm(): ReactElement {
  const query = useQueryClient()

  const [amount, setAmount] = useState<number | null>(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm()

  const { mutate: create, isPending: creating } = useMutation({
    mutationFn: async (data: CreateExtraCost) => {
      const response = await createExtraCost(data)
      return response
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['extracost'] })
    }
  })

  return (
    <form
      action=''
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        create(data as CreateExtraCost)
      })}
    >
      <FloatLabel>
        <InputNumber
          value={amount}
          {...register('amount', {
            required: { value: true, message: 'Campo requerido' }
          })}
          min={0}
          max={9999999}
          inputId='amount'
          name='amount'
          invalid={errors?.amount !== undefined}
          onChange={(e) => {
            setAmount(e.value)
            setValue('amount', e.value)
          }}
        />
        <label htmlFor=''>Cantidad</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          {...register('description', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.description !== undefined}
          autoComplete='off'
        />
        <label htmlFor=''>Descripción</label>
      </FloatLabel>
      <FloatLabel>
        <Calendar
          value={watch('date')}
          {...register('date', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          name='date'
          id='date'
          dateFormat='dd/mm/yy'
          invalid={errors?.date !== undefined}
        />
        <label htmlFor=''>Fecha</label>
      </FloatLabel>
      <Button
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        size='small'
        loading={creating}
      />
    </form>
  )
}
