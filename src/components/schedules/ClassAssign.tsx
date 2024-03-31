import { useMutation } from '@tanstack/react-query'
import { assignClass } from 'queries/schedules'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

export default function ClassAssign({
  closeAssign,
  setClass_,
  schedule
}): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const { mutate: mutateClass_ } = useMutation({
    mutationFn: assignClass,
    async onSuccess() {
      reset()
      closeAssign()
    }
  })

  return (
    <div className='flex flex-row gap-3 justify-around bg-transparent items-center'>
      <form
        action=''
        id='assignClass'
        onSubmit={handleSubmit((data) => {
          mutateClass_({
            className: data.class,
            scheduleId: schedule.id,
            setClass_
          })
        })}
      >
        <label>Clase</label>
        <input
          className='rounded-[7px] border border-gray-400 bg-transparent px-1 py-1 font-sans text-sm font-normal text-gray-700 focus:outline-none focus:border-2 focus:border-pink-500'
          type='text'
          form='assign'
          {...register('class', {
            required: {
              value: true,
              message: 'El nombre de la clase es requerido'
            }
          })}
        />
        {errors?.class && (
          <span className='inputError'>{errors.class.message as string}</span>
        )}
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white p-1 rounded focus:outline-none'
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
