import { useState, useEffect, type ReactElement } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import { type Subscription } from 'utils/ClubSalud/types'
import moment from 'moment'
import 'moment/locale/es'
import { FloatLabel } from 'primereact/floatlabel'
import { Calendar } from 'primereact/calendar'
import { getSubscriptions } from 'queries/ClubSalud/subscriptions'
import { Button } from 'primereact/button'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import Debtors from './Debtors'
import {
  DateUtils
} from 'utils/ClubSalud/dates'
import SubscriptionList from './SubscriptionsList'

moment.locale('es')

const subscriptionsTotal = (
  subscriptions: Subscription[],
  date: Date
): Subscription[] => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      DateUtils.isSameYear(subs.initialDate, date) && DateUtils.isSameMonth(subs.initialDate, date)
  )
  return current
}

const subscriptionsPaid = (
  subscriptions: Subscription[],
  date: Date
): Subscription[] => {
  const current = subscriptions.filter(
    (subs: Subscription) =>
      DateUtils.isSameYear(subs.initialDate, date) &&
      DateUtils.isSameMonth(subs.initialDate, date) &&
      subs.paid
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
      moment(subs.initialDate).month() === moment(date).month() &&
      !subs.paid
  )
  return current
}

export default function ChartSubscriptionsReport(): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [total, setTotal] = useState<Subscription[]>([])
  const [paid, setPaid] = useState<Subscription[]>([])
  const [notpaid, setNotpaid] = useState<Subscription[]>([])

  const [date, setDate] = useState<Date>(DateUtils.getCurrentDate())
  const [label, setLabel] = useState<string>('')

  const [debtorsList, openDebtorsList, closeDebtorsList] = useModal(false)

  const [subscriptionList, openSubscriptionList, closeSubscriptionList] = useModal()
  const [subscriptionsList, setSubscriptionsList] = useState<Subscription[]>([])

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
      labels: [label],
      datasets: [
        {
          type: 'bar',
          label: 'Total',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: [total.length]
        },
        {
          type: 'bar',
          label: 'Pagos',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [paid.length]
        },
        {
          type: 'bar',
          label: 'No pagos',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: [notpaid.length]
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
      },
      onClick: (event, elements) => {
        if (elements[0]?.datasetIndex !== undefined) {
          const { datasetIndex } = elements[0]
          if (datasetIndex === 0) {
            setSubscriptionsList(total)
          } else if (datasetIndex === 1) {
            setSubscriptionsList(paid)
          } else if (datasetIndex === 2) {
            setSubscriptionsList(notpaid)
          }
          openSubscriptionList()
        }
      }
    }
    setChartData(data)
    setChartOptions(options)
  }, [total, paid, notpaid])

  useEffect(() => {
    setLabel(moment(date).format('MMMM').toUpperCase())

    setTotal(subscriptionsTotal(subscriptions ?? [], date))

    setPaid(subscriptionsPaid(subscriptions ?? [], date))

    setNotpaid(subsciptionsNotPaid(subscriptions ?? [], date))
  }, [subscriptions, date])

  return (
    <div className='card'>
      <Dialog
        onHide={closeDebtorsList}
        visible={debtorsList}
      >
        <Debtors date={date} />
      </Dialog>
      <Dialog
        onHide={closeSubscriptionList}
        visible={subscriptionList}
      >
        <SubscriptionList subscriptionList={subscriptionsList} />
      </Dialog>
      <div className='flex flex-row gap-4 align-items-center'>
        <h2>Suscripciones - Cobros Particulares</h2>
        <FloatLabel>
          <Calendar
            value={date}
            onChange={(e) => {
              setDate(DateUtils.newDate(e.value ?? ''))
            }}
            view='month'
            dateFormat='mm/yy'
          />
          <label htmlFor=''>Filtrar por mes</label>
        </FloatLabel>
        <Button
          label='Lista de deudores'
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
