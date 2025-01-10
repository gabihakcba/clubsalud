import { useState, useEffect, type ReactElement } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/ClubSalud/members'
import { type Payment, type Attendance, type Member } from 'utils/ClubSalud/types'
import moment from 'moment'
import 'moment/locale/es'
import { FloatLabel } from 'primereact/floatlabel'
import { Calendar } from 'primereact/calendar'
import { SelectButton } from 'primereact/selectbutton'

moment.locale('es')

const totalMembers = (members: Member[], date: Date): number => {
  const current = members.filter(
    (mem: Member) =>
      moment(mem.inscriptionDate).year() <= moment(date).year() ||
      moment(mem.inscriptionDate).month() <= moment(date).month()
  )
  return current.length
}

const activeMembers = (members: Member[], date: Date): number => {
  const current = members.filter(
    (mem: Member) =>
      (moment(mem.inscriptionDate).year() <= moment(date).year() ||
        moment(mem.inscriptionDate).month() <= moment(date).month()) &&
      mem.state
  )
  return current.length
}

const attendaceMembers = (members: Member[], date: Date): number => {
  const current = members.filter(
    (mem: Member) =>
      (moment(mem.inscriptionDate).year() <= moment(date).year() ||
        moment(mem.inscriptionDate).month() <= moment(date).month()) &&
      mem.memberAttendance?.some(
        (att: Attendance) =>
          moment(att.date).year() === moment(date).year() &&
          moment(att.date).month() === moment(date).month()
      )
  )
  return current.length
}

const paymentMembers = (members: Member[], date: Date): number => {
  const current = members.filter(
    (mem: Member) =>
      (moment(mem.inscriptionDate).year() <= moment(date).year() ||
        moment(mem.inscriptionDate).month() <= moment(date).month()) &&
      mem.payment?.some(
        (pay: Payment) =>
          moment(pay.date).year() === moment(date).year() &&
          moment(pay.date).month() === moment(date).month()
      )
  )
  return current.length
}

export default function ChartMemberReport(): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [total, setTotal] = useState<number[]>([0])
  const [active, setActive] = useState<number[]>([0])
  const [attendance, setAttendance] = useState<number[]>([0])
  const [payment, setPayment] = useState<number[]>([0])

  const [months, setMonths] = useState<number>(1)
  const [date, setDate] = useState<Date>(moment().toDate())
  const [labels, setLabels] = useState<any[]>([])

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const data = {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'Total',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: total
        },
        {
          type: 'bar',
          label: 'Activos',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: active
        },
        {
          type: 'bar',
          label: 'Con asistencia',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: attendance
        },
        {
          type: 'bar',
          label: 'Con pagos',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: payment
        }
      ]
    }
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [total, active, attendance, payment])

  useEffect(() => {
    const total: number[] = []
    const active: number[] = []
    const attendance: number[] = []
    const payment: number[] = []
    const labels: string[] = []

    for (let i = 0; i < months; i++) {
      /**
       * Labels
       */
      const currentDate = moment(date).subtract(i, 'months')
      labels.push(currentDate.format('MMMM').toUpperCase())

      /**
       * In
       */
      const currentTotal = totalMembers(
        members ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      const currentActive = activeMembers(
        members ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      const currentAttendance = attendaceMembers(
        members ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      const currentPayment = paymentMembers(
        members ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      total.push(currentTotal)
      active.push(currentActive)
      attendance.push(currentAttendance)
      payment.push(currentPayment)
    }
    setLabels(labels.reverse())
    setTotal(total.reverse())
    setActive(active.reverse())
    setAttendance(attendance.reverse())
    setPayment(payment.reverse())
  }, [members, months, date])

  return (
    <div className='card'>
      <div className='flex flex-row gap-4 align-items-center'>
        <h2>Alumnos</h2>
        <FloatLabel>
          <Calendar
            value={date}
            onChange={(e) => {
              setDate(moment(e.value).toDate())
            }}
            view='month'
            dateFormat='mm/yy'
          />
          <label htmlFor=''>Filtrar por mes</label>
        </FloatLabel>
        <SelectButton
          value={months}
          onChange={(e) => {
            setMonths(e.value as number)
          }}
          optionLabel='value'
          options={[
            { option: 'Mensual', value: 1 },
            { option: 'Trimestral', value: 3 },
            { option: 'Semestral', value: 6 },
            { option: 'Anual', value: 12 }
          ]}
        />
      </div>
      <Chart
        type='bar'
        data={chartData}
        options={chartOptions}
        width='60dvw'
        height='60dvh'
      />
    </div>
  )
}
