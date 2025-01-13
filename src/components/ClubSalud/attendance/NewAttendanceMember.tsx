import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { createAttendance } from 'queries/ClubSalud/attendance'
import { getClasses } from 'queries/ClubSalud/classes'
import { getMembers } from 'queries/ClubSalud/members'
import { useEffect, useRef, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Member, type Class_, type Schedule } from '../../../utils/ClubSalud/types'
import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import moment from 'moment'
import { InputNumber } from 'primereact/inputnumber'
import { getSchedules } from 'queries/ClubSalud/schedules'
import { type AxiosError } from 'axios'
import { Toast } from 'primereact/toast'

const days = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY'
]

const getClass = (schedules: Schedule[] | undefined): Class_ | undefined => {
  const day = days[moment().day() - 1]
  const hour = moment().hour()
  const minute = moment().minute()
  const schedule = schedules?.find(
    (schedule) =>
      schedule.start < Number(`${hour}${minute}`) &&
      schedule.end > Number(`${hour}${minute}`) &&
      schedule.day === day
  )
  return schedule?.class
}

const getMember = (dni: number, members: Member[]): Member | undefined =>
  members.find((member: Member) => member.dni.toString() === dni.toString())

export default function NewAttendanceMember(): ReactElement {
  const toast = useRef<Toast>(null)

  const query = useQueryClient()

  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  )
  const [defaultClass, setDefaultClass] = useState<Class_ | undefined>(
    undefined
  )
  const [selectedClass, setSelectedClass] = useState<Class_ | undefined>(
    undefined
  )
  const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate())
  const [label, setLabel] = useState('DNI')

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

  const { data: schedule } = useQuery({
    queryKey: ['sche'],
    queryFn: async () => {
      const res = await getSchedules()
      return res
    }
  })

  const { mutate: createAtt, isPending: isPendingAtt } = useMutation({
    mutationFn: async (data: {
      memberId: number
      classId: number
      date: Date
    }) => {
      return await createAttendance(data)
    },
    onSuccess: async (data) => {
      await query.refetchQueries({ queryKey: ['attendances'] })
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Asistencia marcada correctamente',
          detail: JSON.stringify(data),
          life: 3000,
          sticky: true
        })
      }
    },
    onError: (data: AxiosError) => {
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error al crear asistencia',
          detail: String(data.response?.data),
          life: 3000,
          sticky: true
        })
      }
    }
  })

  useEffect(() => {
    setValue('date', moment().toDate())
    const class_ = getClass(schedule)
    setDefaultClass(class_)
  }, [schedule])

  useEffect(() => {
    setSelectedClass(defaultClass)
    setValue('class', defaultClass?.name)
    setValue('classId', defaultClass?.id)
  }, [defaultClass])

  useEffect(() => {
    setLabel(selectedMember?.name ?? 'DNI')
  }, [selectedMember])

  return (
    <form
      action=''
      className='flex flex-column gap-4 justify-content-between'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        const params = {
          memberId: Number(selectedMember?.id),
          classId: data.classId,
          date: data.date
        }
        createAtt(params)
      })}
    >
      <Toast ref={toast} position='top-left'/>
      <div className='flex flex-column gap-4'>
        <FloatLabel>
          <InputNumber
            disabled={loadingMembers}
            onChange={(e) => {
              if (e.value) {
                const member = getMember(e.value, members ?? [])
                setSelectedMember(member)
              }
            }}
          />
          <label htmlFor=''>{label}</label>
        </FloatLabel>

        <Dropdown
          {...register('class', { required: true })}
          invalid={errors?.class !== undefined}
          value={selectedClass}
          options={classes}
          optionLabel='name'
          placeholder='Clase'
          loading={loadingClasses}
          onChange={(e) => {
            setSelectedClass(e.value as Class_)
            setValue('classId', e.value.id as number)
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
              setValue('date', moment(e.value).toDate())
              setSelectedDate(moment(e.value).toDate())
            }}
            dateFormat='dd/mm/yy'
          />
          <label htmlFor=''>Fecha</label>
        </FloatLabel>
      </div>

      <div className='flex flex-column gap-2'>
        <Button
          label='Enviar'
          icon='pi pi-upload'
          iconPos='right'
          outlined
          size='small'
          loading={isPendingAtt}
          disabled={!selectedMember}
        />
      </div>
    </form>
  )
}
