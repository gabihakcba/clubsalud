import { useMutation, useQueryClient } from '@tanstack/react-query'
import { assignInstructor } from 'queries/schedules'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Schedule } from 'utils/types'

interface params {
  closeAssign: () => void
  schedule: Schedule
}
export default function InstructorAssign({
  closeAssign,
  schedule
}: params): ReactElement {
  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const { mutate: mutateInstructor } = useMutation({
    mutationFn: assignInstructor,
    async onSuccess(data) {
      await query.setQueryData(['insSChe', schedule.id], data)
      reset()
      closeAssign()
    }
  })

  return (
    <div className='flex flex-row gap-3 justify-around bg-transparent items-center'>
      <form
        action=''
        id='assignInstructor'
        onSubmit={handleSubmit((data) => {
          mutateInstructor({
            instructorName: data.instructor,
            scheduleId: schedule.id
          })
        })}
      >
        <label>Profesor</label>
        <input
          className='rounded-[7px] border border-gray-400 bg-transparent px-1 py-1 font-sans text-sm font-normal text-gray-700 focus:outline-none focus:border-2 focus:border-pink-500'
          type='text'
          form='assign'
          {...register('instructor', {
            required: {
              value: true,
              message: 'El nombre del profesor es requerido'
            }
          })}
        />
        {errors?.instructor && (
          <span className='inputError'>
            {errors.instructor.message as string}
          </span>
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
