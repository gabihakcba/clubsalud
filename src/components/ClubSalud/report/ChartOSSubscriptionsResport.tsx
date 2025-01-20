import { useState, useEffect, type ReactElement } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import { type Member, type Subscription } from 'utils/ClubSalud/types'
import moment from 'moment'
import 'moment/locale/es'
import { FloatLabel } from 'primereact/floatlabel'
import { Calendar } from 'primereact/calendar'
import { SelectButton } from 'primereact/selectbutton'
import { getSubscriptions } from 'queries/ClubSalud/subscriptions'
import { Button } from 'primereact/button'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import PendingOSBills from './PendingOSBills'

moment.locale('es')

const subscriptionsTotal = (
  subscriptions: Subscription[],
  date: Date
): Subscription[] => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      moment(subs.initialDate).year() === moment(date).year() &&
      moment(subs.initialDate).month() <= moment(date).month()
  )
  return current
}

const subscriptionsPaid = (
  subscriptions: Subscription[],
  date: Date
): Subscription[] => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      moment(subs.initialDate).year() === moment(date).year() &&
      moment(subs.initialDate).month() <= moment(date).month() &&
      (subs.billedConsultation?.length ?? 0) >= subs.plan.durationMonth * 2
  )
  return current
}

const subsciptionsNotPaid = (
  subscriptions: Subscription[],
  date: Date
): Subscription[] => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      moment(subs.initialDate).year() === moment(date).year() &&
      moment(subs.initialDate).month() <= moment(date).month() &&
      (subs.billedConsultation?.length ?? 0) < subs.plan.durationMonth * 2
  )
  return current
}

const getDebtors = (subscriptionsNotPaid: Subscription[]): Member[] => {
  const debtorsList = subscriptionsNotPaid
    .filter((subscription) => !!subscription.member)
    .map((subscription) => subscription.member)
  return debtorsList
}

export default function ChartOSSubscriptionsReport(): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [total, setTotal] = useState<Subscription[][]>([])
  const [paid, setPaid] = useState<Subscription[][]>([])
  const [notpaid, setNotpaid] = useState<Subscription[][]>([])

  const [months, setMonths] = useState<number>(1)
  const [date, setDate] = useState<Date>(moment().toDate())
  const [labels, setLabels] = useState<any[]>([])

  const [debtorsList, openDebtorsList, closeDebtorsList] = useModal(false)
  const [debtors, setDebtors] = useState<Member[]>([])

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
          data: total.map((t) => t.length)
        },
        {
          type: 'bar',
          label: 'Pagos',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: paid.map((p) => p.length)
        },
        {
          type: 'bar',
          label: 'No pagos',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: notpaid.map((n) => n.length)
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
    const total: Subscription[][] = []
    const paid: Subscription[][] = []
    const notpaid: Subscription[][] = []
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
      const currentTotal = subscriptionsTotal(
        subscriptions ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      const currentPaid = subscriptionsPaid(
        subscriptions ?? [],
        moment(date).subtract(i, 'months').toDate()
      )

      const currentNotpaid = subsciptionsNotPaid(
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

  useEffect(() => {
    setDebtors(getDebtors(notpaid.flat()))
  }, [notpaid])

  return (
    <div className='card'>
      <Dialog
        onHide={closeDebtorsList}
        visible={debtorsList}
      >
        <PendingOSBills debtors={debtors} />
      </Dialog>
      <div className='flex flex-row gap-4 align-items-center'>
        <h2>Suscripciones - Cobros Obras Sociales</h2>
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
        <Button
          label='Lista OS faltantes'
          size='small'
          outlined
          onClick={openDebtorsList}
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
