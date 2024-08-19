'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import ChartReport from 'components/report/ChartReport'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { DataTable } from 'primereact/datatable'
import { InputSwitch } from 'primereact/inputswitch'
import { Row } from 'primereact/row'
import { Tag } from 'primereact/tag'
import { getInstructorPrice } from 'queries/instructorPayments'
import { getSchedules } from 'queries/schedules'
import { useEffect, type ReactElement, useState } from 'react'
import {
  type Schedule,
  type InstructorPrice,
  type priceType,
  type reportType
} from 'utils/types'

const fullReport = (price: priceType, title: boolean): reportType => {
  const hoursPerDay = 12
  const hoursPerWeek = hoursPerDay * 5
  const hoursPerMonth = hoursPerWeek * 4

  const report: reportType = {
    title: `Horario completo ${title ? '(max)' : '(min)'}`,

    totalHoursPerWeek: hoursPerWeek,
    hoursTitlePerWeek: title ? hoursPerWeek : 0,
    hoursNoTitlePerWeek: !title ? hoursPerWeek : 0,
    amountTitlePerWeek: title ? hoursPerWeek * price.title : 0,
    amountNoTitlePerWeek: !title ? hoursPerWeek * price.notitle : 0,
    amountPerWeek: title
      ? hoursPerWeek * price.title
      : hoursPerWeek * price.notitle,

    totalHoursPerMonth: hoursPerMonth,
    hoursTitlePerMonth: title ? hoursPerMonth : 0,
    hoursNoTitlePerMonth: !title ? hoursPerMonth : 0,
    amountTitlePerMonth: title ? hoursPerMonth * price.title : 0,
    amountNoTitlePerMonth: !title ? hoursPerMonth * price.notitle : 0,
    amountPerMonth: title
      ? hoursPerMonth * price.title
      : hoursPerMonth * price.notitle
  }
  return report
}

const currentReport = (schedules: Schedule[], price: priceType): reportType => {
  const activeSchedules = schedules.filter((sche: Schedule) => sche.charge)

  const totalHoursPerWeek = activeSchedules.length / 2
  const hoursTitlePerWeek =
    activeSchedules.filter((sche: Schedule) => sche.charge?.degree).length / 2
  const hoursNoTitlePerWeek =
    activeSchedules.filter((sche: Schedule) => !sche.charge?.degree).length / 2

  const amountTitlePerWeek = hoursTitlePerWeek * price.title
  const amountNoTitlePerWeek = hoursNoTitlePerWeek * price.notitle
  const amountPerWeek = amountTitlePerWeek + amountNoTitlePerWeek

  const totalHoursPerMonth = totalHoursPerWeek * 4
  const hoursTitlePerMonth = hoursTitlePerWeek * 4
  const hoursNoTitlePerMonth = hoursNoTitlePerWeek * 4
  const amountTitlePerMonth = hoursTitlePerMonth * price.title
  const amountNoTitlePerMonth = hoursNoTitlePerMonth * price.notitle
  const amountPerMonth = amountTitlePerMonth + amountNoTitlePerMonth

  const report: reportType = {
    title: 'Horarios actuales',

    totalHoursPerWeek,
    hoursTitlePerWeek,
    hoursNoTitlePerWeek,
    amountTitlePerWeek,
    amountNoTitlePerWeek,
    amountPerWeek,

    totalHoursPerMonth,
    hoursTitlePerMonth,
    hoursNoTitlePerMonth,
    amountTitlePerMonth,
    amountNoTitlePerMonth,
    amountPerMonth
  }
  return report
}

export default function Reports(): ReactElement {
  const query = useQueryClient()

  const [monthShow, setMonthShow] = useState<boolean>(true)
  const [weekShow, setWeekShow] = useState<boolean>(true)

  const monthColumns = [
    'amountPerMonth',
    'totalHoursPerMonth',
    'amountTitlePerMonth',
    'hoursTitlePerMonth',
    'amountNoTitlePerMonth',
    'hoursNoTitlePerMonth'
  ]

  const weekColumns = [
    'amountPerWeek',
    'totalHoursPerWeek',
    'amountTitlePerWeek',
    'hoursTitlePerWeek',
    'amountNoTitlePerWeek',
    'hoursNoTitlePerWeek'
  ]

  const titleColumns = [
    'Pago Total',
    'Horas Totales',
    'Total Título',
    'Horas Título',
    'Total no Título',
    'Horas no Título'
  ]

  const [price, setPrice] = useState<priceType>({
    title: 0,
    notitle: 0
  })

  const [reports, setReports] = useState<reportType[]>([])

  const { data: schedules, isFetching: isFetchingSchedules } = useQuery({
    queryKey: ['sche'],
    queryFn: async () => {
      return await getSchedules()
    }
  })

  const { data: prices, isFetching: isFetchingPrices } = useQuery({
    queryKey: ['ins'],
    queryFn: async () => {
      return await getInstructorPrice()
    }
  })

  useEffect(() => {
    if (prices) {
      const lastIndexWithTitle = prices.findIndex(
        (price: InstructorPrice) => price.degree && price.active
      )
      const lastIndexWithNoTitle = prices.findIndex(
        (price: InstructorPrice) => !price.degree && price.active
      )
      setPrice({
        title: Number(prices[lastIndexWithTitle]?.amount),
        notitle: Number(prices[lastIndexWithNoTitle]?.amount)
      })
    }
  }, [prices])

  useEffect(() => {}, [schedules, price])

  return (
    <Card className='h-screen overflow-scroll'>
      <div className='flex flex-column gap-8'>
        <DataTable
          showGridlines
          stripedRows
          value={reports}
          header={() => (
            <div className='flex flex-row gap-4 align-items-center'>
              <h2>Reportes</h2>
              <Tag severity='success'>$/h título: ${price.title}</Tag>
              <Tag severity='danger'>$/h sin título: ${price.notitle}</Tag>
              <Button
                label='Generar reportes'
                icon={reports.length > 0 ? 'pi pi-refresh' : 'pi pi-calculator'}
                iconPos='right'
                size='small'
                loading={isFetchingPrices || isFetchingSchedules}
                onClick={async () => {
                  await query.refetchQueries({ queryKey: ['sche'] })
                  await query.refetchQueries({ queryKey: ['ins'] })
                  setReports([
                    currentReport(schedules ?? [], price),
                    fullReport(price, true),
                    fullReport(price, false)
                  ])
                }}
              />
              <label htmlFor=''>Mes</label>
              <InputSwitch
                checked={monthShow}
                onChange={(e) => {
                  setMonthShow(e.value)
                }}
              />
              <label htmlFor=''>Semana</label>
              <InputSwitch
                checked={weekShow}
                onChange={(e) => {
                  setWeekShow(e.value)
                }}
              />
            </div>
          )}
          headerColumnGroup={
            <ColumnGroup>
              <Row>
                <Column
                  header='Reporte'
                  rowSpan={2}
                />
                {monthShow && (
                  <Column
                    header='Mes'
                    colSpan={6}
                  />
                )}
                {weekShow && (
                  <Column
                    header='Semana'
                    colSpan={6}
                  />
                )}
              </Row>
              <Row>
                {monthShow &&
                  titleColumns.map((col, index) => (
                    <Column
                      header={col}
                      key={index}
                    />
                  ))}

                {weekShow &&
                  titleColumns.map((col, index) => (
                    <Column
                      header={col}
                      key={index}
                    />
                  ))}
              </Row>
            </ColumnGroup>
          }
        >
          <Column field='title' />

          {monthShow &&
            monthColumns.map((col, index) => (
              <Column
                key={index}
                field={col}
              />
            ))}

          {weekShow &&
            weekColumns.map((col, index) => (
              <Column
                key={index}
                field={col}
              />
            ))}
        </DataTable>
        <ChartReport/>
      </div>
    </Card>
  )
}
