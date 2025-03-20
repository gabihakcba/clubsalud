import { useState, useEffect, type ReactElement } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import {
  type BilledConsultation,
  type Subscription
} from 'utils/ClubSalud/types'
import moment from 'moment'
import 'moment/locale/es'
import { FloatLabel } from 'primereact/floatlabel'
import { Calendar } from 'primereact/calendar'
import { getSubscriptions } from 'queries/ClubSalud/subscriptions'
import { Button } from 'primereact/button'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import ListSubscriptions from './ListSubscriptions'
import { argIsBetween } from 'utils/ClubSalud/dates'
import { getBilled } from 'queries/ClubSalud/payments'
import ListBilledConsultations from './ListBilledConsultations'

moment.locale('es')

const isInRange = (
  subscription: Subscription,
  initialDate: Date,
  endDate: Date
): boolean => {
  return (
    argIsBetween(subscription.initialDate, initialDate, endDate) ||
    argIsBetween(subscription.expirationDate, initialDate, endDate) ||
    argIsBetween(
      initialDate,
      subscription.initialDate,
      subscription.expirationDate
    )
  )
}

const subscriptionsInRange = (
  subscriptions: Subscription[],
  initialDate: Date,
  endDate: Date
): Subscription[] => {
  return subscriptions.filter((subscription: Subscription) =>
    isInRange(subscription, initialDate, endDate) && subscription.isByOS
  )
}

const subscriptionsPaid = (subscriptions: Subscription[]): Subscription[] => {
  return subscriptions.filter(
    (subscription: Subscription) =>
      (subscription.billedConsultation?.length ?? 0) >=
      subscription.plan.durationMonth * 2
  )
}

const subscriptionsNotPaid = (
  subscriptions: Subscription[]
): Subscription[] => {
  return subscriptions.filter(
    (subscription: Subscription) =>
      (subscription.billedConsultation?.length ?? 0) <
      subscription.plan.durationMonth * 2
  )
}

const subsciptionsOneRemaining = (
  subscriptions: Subscription[],
  initialDate: Date,
  endDate: Date
): Subscription[] => {
  return subscriptions.filter((subscription: Subscription) => {
    if (subscription.plan.durationMonth === 1) {
      return subscription.billedConsultation?.length === 1
    } else {
      return (
        subscription.billedConsultation?.filter(
          (billedConsultation: BilledConsultation) =>
            argIsBetween(billedConsultation.date, initialDate, endDate)
        ).length === 1
      )
    }
  })
}

const subsciptionsTwoRemaining = (
  subscriptions: Subscription[],
  initialDate: Date,
  endDate: Date
): Subscription[] => {
  return subscriptions.filter((subscription: Subscription) => {
    if (subscription.plan.durationMonth === 1) {
      return subscription.billedConsultation?.length === 0
    } else {
      return (
        subscription.billedConsultation?.filter(
          (billedConsultation: BilledConsultation) =>
            argIsBetween(billedConsultation.date, initialDate, endDate)
        ).length === 0
      )
    }
  })
}

export default function ChartOSSubscriptionsReport(): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [total, setTotal] = useState<Subscription[]>([])
  const [paid, setPaid] = useState<Subscription[]>([])
  const [notPaid, setNotPaid] = useState<Subscription[]>([])
  const [oneRemaining, setOneRemaining] = useState<Subscription[]>([])
  const [twoRemaining, setTwoRemaining] = useState<Subscription[]>([])

  const [list, setList] = useState<Subscription[]>([])

  const [initialDate, setInitialDate] = useState<Date>(
    moment().startOf('month').toDate()
  )
  const [endDate, setEndDate] = useState<Date>(moment().endOf('month').toDate())
  const [label, setLabel] = useState<any[]>([])

  const [subscriptionsList, openSubscriptionsList, closeSubscriptionsList] =
    useModal(false)
  const [billedList, openBilledList, closeBilledList] = useModal(false)

  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      return await getSubscriptions()
    }
  })

  const { data: billedConsultations } = useQuery({
    queryKey: ['billedConsultations'],
    queryFn: async () => {
      return await getBilled()
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
          data: [notPaid.length]
        },
        {
          type: 'bar',
          label: 'Con 1 pago',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [oneRemaining.length]
        },
        {
          type: 'bar',
          label: 'Sin pagos',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: [twoRemaining.length]
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
            setList(total)
          } else if (datasetIndex === 1) {
            setList(paid)
          } else if (datasetIndex === 2) {
            setList(notPaid)
          } else if (datasetIndex === 3) {
            setList(oneRemaining)
          } else if (datasetIndex === 4) {
            setList(twoRemaining)
          }
          openSubscriptionsList()
        }
      }
    }
    setChartData(data)
    setChartOptions(options)
  }, [total, paid, oneRemaining, twoRemaining])

  useEffect(() => {
    setLabel([
      `${moment(initialDate).subtract('month').format('MMMM').toUpperCase()}`
    ])

    const total = subscriptionsInRange(
      subscriptions ?? [],
      initialDate,
      endDate
    )
    setTotal(total)

    const paid = subscriptionsPaid(total)
    setPaid(paid)

    const notPaid = subscriptionsNotPaid(total)
    setNotPaid(notPaid)

    const one = subsciptionsOneRemaining(notPaid, initialDate, endDate)
    setOneRemaining(one)

    const two = subsciptionsTwoRemaining(notPaid, initialDate, endDate)
    setTwoRemaining(two)
  }, [subscriptions, initialDate, endDate])

  return (
    <div className='card'>
      <Dialog
        onHide={closeBilledList}
        visible={billedList}
      >
        <ListBilledConsultations
          billedConsultations={
            billedConsultations?.filter((bill: BilledConsultation) =>
              argIsBetween(bill.date, initialDate, endDate)
            ) ?? []
          }
        />
      </Dialog>
      <Dialog
        onHide={closeSubscriptionsList}
        visible={subscriptionsList}
      >
        <ListSubscriptions
          subscriptions={list}
          header=''
        />
      </Dialog>
      <div className='flex flex-row gap-4 align-items-center'>
        <h2>Suscripciones - Cobros Obras Sociales</h2>
        <FloatLabel>
          <Calendar
            value={initialDate}
            onChange={(e) => {
              setInitialDate(moment(e.value).startOf('month').toDate())
              setEndDate(moment(e.value).endOf('month').toDate())
            }}
            view='month'
            dateFormat='mm/yy'
          />
          <label htmlFor=''>Filtrar por mes</label>
        </FloatLabel>
        <Button
          label='OS Cobradas'
          size='small'
          outlined
          onClick={openBilledList}
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
