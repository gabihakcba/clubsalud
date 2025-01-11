import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { getClasses } from 'queries/ClubSalud/classes'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Class_, type Instructor } from '../../../utils/ClubSalud/types'
import { getInstructors } from 'queries/ClubSalud/instructors'
import { createAttendanceInstructor } from 'queries/ClubSalud/attendanceInstructor'
import { FloatLabel } from 'primereact/floatlabel'
import { Calendar } from 'primereact/calendar'
import moment from 'moment'
import { InputNumber } from 'primereact/inputnumber'

export default function AttendanceInstructorForm({
  instructor
}: {
  instructor?: Instructor
}): ReactElement {
  const query = useQueryClient()

  const [selectedInstructor, setSelectedInstructor] = useState<
  Instructor | undefined
  >(instructor)
  const [selectedClass, setSelectedClass] = useState<Class_ | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate())

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const { data: classes, isPending: loadingClasses } = useQuery({
    queryKey: ['class'],
    queryFn: async () => {
      return await getClasses()
    }
  })

  const { data: instructors, isPending: loadingInstructors } = useQuery({
    queryKey: ['ins'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const { mutate: createAtt, isPending: isPendingAtt } = useMutation({
    mutationFn: createAttendanceInstructor,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['instructors'] })
    },
    onError: (data) => {}
  })

  useEffect(() => {
    setValue('date', moment().toDate())
    setSelectedInstructor(instructor)
  }, [instructor])

  return (
    <form
      action=''
      className='flex flex-column gap-4 justify-content-between'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        createAtt({
          instructorId: Number(selectedInstructor?.id),
          classId: data.classId,
          date: data.date,
          hours: data.hours
        })
      })}
    >
      <div className='flex flex-column gap-4'>
        {!instructor && (
          <Dropdown
            filter
            filterBy='dni,name'
            value={selectedInstructor}
            options={instructors}
            optionLabel='name'
            placeholder='Profesor'
            loading={loadingInstructors}
            invalid={selectedInstructor === undefined}
            onChange={(e) => {
              setSelectedInstructor(e.value as Instructor)
            }}
          />)
        }

        <Dropdown
          {...register('class', { required: true })}
          value={selectedClass}
          options={classes}
          optionLabel='name'
          optionValue='id'
          placeholder='Clase'
          loading={loadingClasses}
          onChange={(e) => {
            setSelectedClass(e.value as Class_)
            setValue('classId', e.value as number)
          }}
        />

        <FloatLabel>
          <InputNumber
            {...register('hours', {
              required: true
            })}
            invalid={errors?.hours !== undefined}
            max={99}
            min={1}
            onChange={(e) => {
              setValue('hours', Number(e.value))
            }}
          />
          <label htmlFor=''>Horas</label>
        </FloatLabel>

        <FloatLabel>
          <Calendar
            {...register('date', {
              required: true
            })}
            invalid={errors?.date !== undefined}
            value={selectedDate}
            onChange={(e) => {
              setValue('date', moment(e.value).toDate())
              setSelectedDate(moment(e.value).toDate())
            }}
            dateFormat='dd/mm/yy'
          />
          <label htmlFor=''>Fecha</label>
        </FloatLabel>
      </div>

      <Button
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        outlined
        size='small'
        disabled={!selectedInstructor}
        loading={isPendingAtt}
      />
    </form>
  )
}
