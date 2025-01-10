import { useState, useEffect, type ReactElement } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import { getInstructorPayments } from 'queries/ClubSalud/instructorPayments'
import { getEmployeePayments } from 'queries/ClubSalud/employeePayments'
import moment from 'moment'
import 'moment/locale/es'
import {
  type BilledConsultation,
  type EmployeePayment,
  type ExtraCost,
  type InstructorPayment,
  type Payment
} from 'utils/ClubSalud/types'
import { getBilled, getPayments } from 'queries/ClubSalud/payments'
import { Card } from 'primereact/card'
import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import { SelectButton } from 'primereact/selectbutton'
import { getExtraCost } from 'queries/ClubSalud/extraCost'

moment.locale('es')

const totalInstructorsPayments = (
  instructorPayments: InstructorPayment[],
  date: Date
): number => {
  const currentMonth = instructorPayments?.filter(
    (pay: InstructorPayment) =>
      moment(pay.paymentDate).month() === moment(date).month() &&
      moment(pay.paymentDate).year() === moment(date).year()
  )
  const total = currentMonth?.reduce(
    (acc: number, curr: InstructorPayment) => acc + curr.amount,
    0
  )
  return total
}

const totalEmployeesPayments = (
  employeePayments: EmployeePayment[],
  date: Date
): number => {
  const currentMonth = employeePayments?.filter(
    (pay: EmployeePayment) =>
      moment(pay.monthPayment).month() === moment(date).month() &&
      moment(pay.monthPayment).year() === moment(date).year()
  )
  const total = currentMonth?.reduce(
    (acc: number, curr: EmployeePayment) => acc + curr.amount,
    0
  )
  return total
}

const totalExtraCosts = (extracosts: ExtraCost[], date: Date): number => {
  const currentMonth = extracosts.filter(
    (extra: ExtraCost) =>
      moment(extra.date).month() === moment(date).month() &&
      moment(extra.date).year() === moment(date).year()
  )
  const total = currentMonth?.reduce(
    (acc: number, curr: ExtraCost) => acc + curr.amount,
    0
  )
  return total
}

const totalMembersPayments = (payments: Payment[], date: Date): number => {
  const currentMonth = payments?.filter(
    (pay: Payment) =>
      moment(pay.date).month() === moment(date).month() &&
      moment(pay.date).year() === moment(date).year()
  )
  const total = currentMonth?.reduce(
    (acc: number, curr: Payment) => acc + curr.amount,
    0
  )

  return total
}

const totalHealthPayments = (
  healthPayments: BilledConsultation[],
  date: Date
): number => {
  const currentMonth = healthPayments?.filter(
    (bill: BilledConsultation) =>
      moment(bill.date).month() === moment(date).month() &&
      moment(bill.date).year() === moment(date).year()
  )
  const total = currentMonth?.reduce(
    (acc: number, curr: BilledConsultation) => acc + curr.amount,
    0
  )

  return total
}

export default function ChartAccounting(): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [date, setDate] = useState<Date>(moment().toDate())
  const [labels, setLabels] = useState<any[]>([
    moment().format('MMMM').toUpperCase()
  ])
  const [inPayments, setInPayments] = useState<number[]>([0])
  const [inHealth, setInHealth] = useState<number[]>([0])
  const [outPayments, setOutPayments] = useState<number[]>([0])
  const [outInstructors, setOutInstructors] = useState<number[]>([0])
  const [outExtras, setOutExtras] = useState<number[]>([0])
  const [months, setMonths] = useState<number>(1)

  const { data: instructorPayments } = useQuery({
    queryKey: ['instructorPayments'],
    queryFn: async () => {
      return await getInstructorPayments()
    }
  })

  const { data: employeePayments } = useQuery({
    queryKey: ['employeePayments'],
    queryFn: async () => {
      return await getEmployeePayments()
    }
  })

  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      return await getPayments()
    }
  })

  const { data: healthPayments } = useQuery({
    queryKey: ['healthpayments'],
    queryFn: async () => {
      return await getBilled()
    }
  })

  const { data: extraCosts } = useQuery({
    queryKey: ['extracost'],
    queryFn: async () => {
      return await getExtraCost()
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
          label: 'Pago a profesores',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: outInstructors,
          stack: 'out'
        },
        {
          label: 'Pago a emplados',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: outPayments,
          stack: 'out'
        },
        {
          label: 'Gastos extra',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          data: outExtras,
          stack: 'out'
        },
        {
          label: 'Cobros particulares',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: inPayments,
          stack: 'in'
        },
        {
          label: 'Cobros de consultas',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          data: inHealth,
          stack: 'in'
        }
      ]
    }
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            stacked: true,
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [
    date,
    labels,
    inPayments,
    inHealth,
    outPayments,
    outInstructors,
    outExtras
  ])

  useEffect(() => {
    const inPayments: number[] = []
    const outPayments: number[] = []
    const outInstructors: number[] = []
    const outExtras: number[] = []
    const inHealthPayments: number[] = []
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
      const totalMembers = totalMembersPayments(
        payments ?? [],
        moment(date).subtract(i, 'months').toDate()
      )
      const totalHealth = totalHealthPayments(
        healthPayments ?? [],
        moment(date).subtract(i, 'months').toDate()
      )
      inHealthPayments.push(totalHealth)
      inPayments.push(totalMembers)

      /**
       * Out
       */
      const totalEmployees = totalEmployeesPayments(
        employeePayments ?? [],
        moment(date).subtract(i, 'months').toDate()
      )
      const totalInstructor = totalInstructorsPayments(
        instructorPayments ?? [],
        moment(date).subtract(i, 'months').toDate()
      )
      const totalExtra = totalExtraCosts(
        extraCosts ?? [],
        moment(date).subtract(i, 'months').toDate()
      )
      outPayments.push(totalEmployees)
      outExtras.push(totalExtra)
      outInstructors.push(totalInstructor)
    }
    setLabels(labels.reverse())
    setInPayments(inPayments.reverse())
    setInHealth(inHealthPayments.reverse())
    setOutPayments(outPayments.reverse())
    setOutInstructors(outInstructors.reverse())
    setOutExtras(outExtras.reverse())
  }, [
    employeePayments,
    instructorPayments,
    payments,
    healthPayments,
    extraCosts,
    date,
    months
  ])

  return (
    <Card className='card h-screen flex'>
      <div className='flex flex-row gap-4 align-items-center'>
        <h2>Balances por mes</h2>
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
    </Card>
  )
}
