import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { getClasses } from 'queries/classes'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Member, type Class_ } from '../../utils/types'
import { getInstructors } from 'queries/instructors'
import { createAttendanceInstructor } from 'queries/attendanceInstructor'
import { FloatLabel } from 'primereact/floatlabel'
import { Calendar } from 'primereact/calendar'
import moment from 'moment'
import { InputNumber } from 'primereact/inputnumber'

export default function AttendanceInstructorForm(): ReactElement {
  const query = useQueryClient()

  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
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
    onError: (data) => {
    }
  })

  useEffect(() => {
    setValue('date', moment().toDate())
  }, [])

  return (
    <form
      action=''
      className='flex flex-column gap-4 justify-content-between'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        createAtt({
          instructorId: data.instructorId,
          classId: data.classId,
          date: data.date,
          hours: data.hours
        })
      })}
    >
      <div className='flex flex-column gap-4'>
        <Dropdown
          filter
          filterBy='dni'
          {...register('instructor', { required: true })}
          value={selectedMember}
          options={instructors}
          optionLabel='name'
          optionValue='id'
          placeholder='Profesor'
          loading={loadingInstructors}
          onChange={(e) => {
            setSelectedMember(e.value as Member)
            setValue('instructorId', e.value as number)
          }}
        />

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
              setValue('hours', e.value)
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
        loading={isPendingAtt}
      />
    </form>
  )
}
