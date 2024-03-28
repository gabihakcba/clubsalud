import change from '../../../public/change.svg'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Modal from 'components/Modal'
import { getClassById } from 'queries/classes'
import { assignClass } from 'queries/schedules'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Schedule } from 'utils/types'
import { useModal } from 'utils/useModal'

const border = (start: number): string => {
  const border = 'border-r-[1px] border-l-[1px] border-black'
  return start % 100 !== 0
    ? `${border} mb-2 border-b-[1px]`
    : `${border} border-t-[1px]`
}

interface params {
  schedule: Schedule
}

export default function ScheduleCard({ schedule }: params): ReactElement {
  const [sch, setSch] = useState(schedule)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const { data } = useQuery({
    queryKey: ['class', sch.id],
    queryFn: async () => {
      const res = await getClassById(sch.classId)
      return res
    }
  })

  const query = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: assignClass,
    async onSuccess(data, variables, context) {
      /**
       * Arreglar, actulizar los datos sin tener
       * que refectchear todos los schedulers
       */
      await query.resetQueries({ queryKey: ['sch'] })
      // query.setQueryData(['class', schedule.id], {
      //   data: { name: variables.className }
      // })
      // const old = query.getQueryData(['class', schedule.classId])
      // console.log(old, 'classId: ', schedule.classId)
      reset()
      closeAssign()
    }
  })

  const [assign, openAssing, closeAssign] = useModal(false)
  return (
    <div
      key={sch.id}
      className={`flex justify-around text-center ${border(sch.start)}`}
    >
      {(sch.classId && data?.data?.name) ?? '----'}
      <button onClick={openAssing}>
        <Image
          src={change}
          alt='c'
          width={10}
          height={10}
        />
      </button>
      <Modal
        isOpen={assign}
        closeModal={closeAssign}
      >
        <div>
          <label>Clase</label>
          <form
            action=''
            id='assign'
            onSubmit={handleSubmit((data) => {
              mutate({ className: data.class, scheduleId: sch.id })
            })}
          >
            <input
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
              <span className='inputError'>
                {errors.class.message as string}
              </span>
            )}
            <button type='submit'>Enviar</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
