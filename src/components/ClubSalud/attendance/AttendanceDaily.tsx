import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputNumber } from 'primereact/inputnumber'
import { getDailyAttendance } from 'queries/ClubSalud/attendance'
import { useState, type ReactElement } from 'react'
import { argDate, argDate2Format } from 'utils/ClubSalud/dates'
import { type Attendance } from 'utils/ClubSalud/types'

export default function AttendanceDaily(): ReactElement {
  const [date, setDate] = useState<Date>(argDate())
  const [dni, setDni] = useState<number | null>(null)

  const { data: attendances, isFetching } = useQuery({
    queryKey: ['daily', date],
    queryFn: async () => {
      return await getDailyAttendance(date)
    },
    enabled: !!date
  })

  return (
    <>
      <DataTable
        value={attendances?.filter(
          (att) =>
            !dni ||
            Number(att.member?.dni).toString().startsWith(dni.toString())
        )}
        scrollable
        scrollHeight='20rem'
        header={() => {
          return (
            <div className='flex justify-content-around gap-4'>
              <h4>Asistencia</h4>
              <Calendar
                value={date}
                onChange={(e) => {
                  setDate(moment(e.value).toDate())
                }}
                className='w-max'
              />
              <InputNumber
                placeholder='Buscar por DNI'
                value={dni}
                onChange={(e) => {
                  setDni(e.value)
                }}
                className='w-max'
              />
            </div>
          )
        }}
        loading={isFetching}
      >
        <Column
          header='Fecha'
          body={(att: Attendance) => argDate2Format(att.date)}
        />
        <Column
          header='Nombre'
          field='member.name'
        />
        <Column
          header='Apellido'
          field='member.lastName'
        />
        <Column
          header='DNI'
          field='member.dni'
        />
        <Column
          header='Clase'
          field='class.name'
        />
        <Column
          header=''
          field=''
        />
      </DataTable>
    </>
  )
}
