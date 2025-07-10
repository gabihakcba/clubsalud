'use client'

import { useQuery } from '@tanstack/react-query'
import { Chart } from 'primereact/chart'
import { Dialog } from 'primereact/dialog'
import { getCobrosParticulares } from 'queries/ClubSalud/balance'
import { useEffect, useState, type ReactElement } from 'react'
import { type Payment } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import PagosParticularesTable from './CobrosParticularesTable'

export default function CobrosParticularesChart({
  date
}: {
  date: Date
}): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [payments, setPayments] = useState<Payment[]>([])
  const [showPayments, openShowPaymentes, closeShowPayments] = useModal(false)

  const { data: pagos } = useQuery({
    queryKey: ['balance-cobros-particular', date],
    queryFn: async () => {
      return await getCobrosParticulares(date)
    }
  })

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)

    const efectivo = Number(pagos?.efectivo?.total)
    const trasferencia = Number(pagos?.transferencia?.total)

    const data = {
      labels: [`Efectivo $${efectivo}`, `Transferencia $${trasferencia}`],
      datasets: [
        {
          data: [efectivo, trasferencia],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    }

    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      },
      onClick: (event, elements) => {
        if (elements[0].index !== undefined) {
          const index = elements[0].index
          if (index === 0) {
            // Corresponde a efectivo
            setPayments(pagos?.efectivo?.pagos ?? [])
            openShowPaymentes()
          } else if (index === 1) {
            // Corresponde a transferencias
            setPayments(pagos?.transferencia?.pagos ?? [])
            openShowPaymentes()
          }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [pagos])

  return (
    <div className='card flex flex-column justify-content-center align-items-center'>
      <Dialog
        visible={showPayments}
        onHide={closeShowPayments}
      >
        <PagosParticularesTable payments={payments} />
      </Dialog>
      <h2>
        Cobros - Total:{' '}
        <span style={{ color: 'yellow' }}>${pagos?.total?.total ?? 0}</span>
      </h2>
      <Chart
        type='pie'
        data={chartData}
        options={chartOptions}
        className='w-full md:w-30rem'
      />
    </div>
  )
}
