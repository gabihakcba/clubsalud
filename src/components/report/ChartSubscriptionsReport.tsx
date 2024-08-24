import { useState, useEffect, type ReactElement } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import {
  type Subscription
} from 'utils/types'
import moment from 'moment'
import 'moment/locale/es'
import { FloatLabel } from 'primereact/floatlabel'
import { Calendar } from 'primereact/calendar'
import { SelectButton } from 'primereact/selectbutton'
import { getSubscriptions } from 'queries/subscriptions'

moment.locale('es')

const totalSubscriptions = (
  subscriptions: Subscription[],
  date: Date
): number => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      moment(subs.initialDate).year() === moment(date).year() &&
      moment(subs.initialDate).month() <= moment(date).month()
  )
  return current.length
}

const totalSubscriptionsPaid = (
  subscriptions: Subscription[],
  date: Date
): number => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      moment(subs.initialDate).year() === moment(date).year() &&
      moment(subs.initialDate).month() <= moment(date).month() &&
      subs.paid
  )
  return current.length
}

const totalSubsciptionsNotPaid = (
  subscriptions: Subscription[],
  date: Date
): number => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      moment(subs.initialDate).year() === moment(date).year() &&
      moment(subs.initialDate).month() <= moment(date).month() &&
      !subs.paid
  )
  return current.length
}

export default function ChartSubscriptionsReport(): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [total, setTotal] = useState<number[]>([0])
  const [paid, setPaid] = useState<number[]>([0])
  const [notpaid, setNotpaid] = useState<number[]>([0])

  const [months, setMonths] = useState<number>(1)
  const [date, setDate] = useState<Date>(moment().toDate())
  const [labels, setLabels] = useState<any[]>([])

  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      return await getSubscriptions()
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
          label: 'Pagos',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: paid
        },
        {
          type: 'bar',
          label: 'No pagos',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: notpaid
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
  }, [total, paid, notpaid])

  useEffect(() => {
    const total: number[] = []
    const paid: number[] = []
    const notpaid: number[] = []
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
      const currentTotal = totalSubscriptions(
        subscriptions ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      const currentPaid = totalSubscriptionsPaid(
        subscriptions ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      const currentNotpaid = totalSubsciptionsNotPaid(
        subscriptions ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      total.push(currentTotal)
      paid.push(currentPaid)
      notpaid.push(currentNotpaid)
    }
    setLabels(labels.reverse())
    setTotal(total.reverse())
    setPaid(paid.reverse())
    setNotpaid(notpaid.reverse())
  }, [subscriptions, months, date])

  return (
    <div className='card'>
      <div className='flex flex-row gap-4 align-items-center'>
        <h2>Subscriptiones</h2>
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
