import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { createAttendance } from 'queries/attendance'
import { getClasses } from 'queries/classes'
import { getMembers } from 'queries/members'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Member, type Class_ } from '../../utils/types'
import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import moment from 'moment'

export default function AttendanceForm(): ReactElement {
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

  const { data: members, isPending: loadingMembers } = useQuery({
    queryKey: ['mem'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const { mutate: createAtt, isPending: isPendingAtt } = useMutation({
    mutationFn: createAttendance,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['attendances'] })
    },
    onError: (data) => {
      console.log('error: ', data)
    }
  })

  useEffect(() => {
    setValue('date', moment().toDate())
  }, [])

  return (
    <form
      action=''
      className='flex flex-column gap-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        console.log(data.date)
        createAtt({
          memberId: data.memberId,
          classId: data.classId,
          date: data.date
        })
      })}
    >
      <Dropdown
        {...register('member', { required: true })}
        invalid={errors?.member !== undefined}
        value={selectedMember}
        options={members}
        optionLabel='name'
        optionValue='id'
        placeholder='Alumno'
        loading={loadingMembers}
        onChange={(e) => {
          setSelectedMember(e.value as Member)
          setValue('memberId', e.value as number)
        }}
      />

      <Dropdown
        {...register('class', { required: true })}
        invalid={errors?.class !== undefined}
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
        <Calendar
          {...register('date', {
            required: true
          })}
          invalid={errors?.date !== undefined}
          value={selectedDate}
          onChange={(e) => {
            console.log(e.value)
            setValue('date', moment(e.value).toDate())
            setSelectedDate(moment(e.value).toDate())
          }}
          dateFormat='dd/mm/yy'
        />
        <label htmlFor=''>Fecha</label>
      </FloatLabel>

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
