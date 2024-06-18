import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { ToggleButton } from 'primereact/togglebutton'
import { createInstructorPrice } from 'queries/instructorPayments'
import { useEffect, type ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type CreateInstructorPrice } from 'utils/types'

export default function FormInstructorPrice(): ReactElement {
  const [selectedDegree, setSelectedDegree] = useState(false)
  const [amount, setAmount] = useState<number>(0)

  const query = useQueryClient()

  const { mutate: createIns, isPending: isPendingCreate } = useMutation({
    mutationFn: async (data: CreateInstructorPrice) => {
      const response = await createInstructorPrice(data)
      return response
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['prices'] })
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    setValue('degree', false)
  }, [])

  return (
    <form
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        createIns(data as CreateInstructorPrice)
      })}
    >
      <div className='flex flex-row align-items-center'>
        <label
          htmlFor='degree'
          className='flex-grow-1'
        >
          Título
        </label>
        <ToggleButton
          defaultChecked={false}
          checked={selectedDegree}
          {...register('degree')}
          form='createFormIns'
          onLabel='Si'
          onIcon='pi pi-check'
          offLabel='No'
          offIcon='pi pi-times'
          iconPos='right'
          onChange={(e) => {
            setSelectedDegree(e.value)
            setValue('degree', e.value)
          }}
          invalid={errors?.degree !== undefined}
        />
      </div>

      <FloatLabel>
        <InputNumber
          value={amount}
          {...register('amount', {
            required: { value: true, message: 'Campo requerido' }
          })}
          min={0}
          max={9999999}
          minFractionDigits={0}
          maxFractionDigits={3}
          inputId='amount'
          name='amount'
          onChange={(e) => {
            setValue('amount', e.value)
            setAmount(Number(e.value))
          }}
        />
        <label htmlFor=''>Precio</label>
      </FloatLabel>

      <Button
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        size='small'
        loading={isPendingCreate}
      />
    </form>
  )
}
