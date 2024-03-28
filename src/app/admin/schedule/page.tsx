'use client'

import { useQuery } from '@tanstack/react-query'
import ScheduleCard from 'components/schedules/ScheduleCard'
import { getSchedules } from 'queries/schedules'
import { type ReactElement } from 'react'
import { type Schedule } from 'utils/types'

// const horarios = [
//   '8:00',
//   '8:30',
//   '9:00',
//   '9:30',
//   '10:00',
//   '10:30',
//   '11:00',
//   '11:30',
//   '12:00',
//   '12:30',
//   '13:00',
//   '13:30',
//   '14:00',
//   '14:30',
//   '15:00',
//   '15:30',
//   '16:00',
//   '16:30',
//   '17:00',
//   '17:30'
// ]

const formatHour = (hour: number): string => {
  return `${Math.floor(hour / 100)}:${hour % 100 > 0 ? hour % 100 : '00'}`
}

const border = (start: number): string => {
  const border = 'border-r-[1px] border-l-[1px] border-black'
  return start % 100 !== 0
    ? `${border} mb-2 border-b-[1px]`
    : `${border} border-t-[1px]`
}

export default function Schelude(): ReactElement {
  const { data } = useQuery({
    queryKey: ['sch'],
    queryFn: async () => {
      const res = await getSchedules()
      return res
    }
  })
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(7rem,7rem) repeat(7, minmax(8rem,1fr))',
        gridTemplateRows:
          'minmax(max-content,max-content) repeat(20, minmax(2rem,1fr))',
        columnGap: '1rem',
        maxHeight: '95dvh',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className='max-w-[97vw] scrollHidden m-2'
    >
      <div className='text-center mb-2'>Dias\Horarios</div>
      <div className='text-center mb-2'>Lunes</div>
      <div className='text-center mb-2'>Martes</div>
      <div className='text-center mb-2'>Miercoles</div>
      <div className='text-center mb-2'>Jueves</div>
      <div className='text-center mb-2'>Viernes</div>
      <div className='text-center mb-2'>Sabado</div>
      <div className='text-center mb-2'>Domingo</div>

      {data?.map((schedule: Schedule, index: number) => (
        <>
          {data[index - 1]?.start !== schedule.start && (
            <div className={`text-center ${border(schedule.start)}`}>
              {`${formatHour(schedule.start)} - ${formatHour(schedule.end)}`}
            </div>
          )}
          <ScheduleCard schedule={schedule}></ScheduleCard>
        </>
      ))}
    </div>
  )
}
