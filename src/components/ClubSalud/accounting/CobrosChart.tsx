'use client'

import { useQuery } from '@tanstack/react-query'
import { Chart } from 'primereact/chart'
import { Dialog } from 'primereact/dialog'
import { getCobros } from 'queries/ClubSalud/balance'
import { useEffect, useState, type ReactElement } from 'react'
import { type BilledConsultation, type Payment } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import CobrosParticularesTable from './CobrosParticularesTable'
import CobrosObraSocialTable from './CobrosObraSocialTable'

export default function CobrosChart({ date }: { date: Date }): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [payments, setPayments] = useState<Payment[]>([])
  const [bills, setBills] = useState<BilledConsultation[]>([])
  const [showPayments, openShowPaymentes, closeShowPayments] = useModal(false)
  const [showBills, openShowBills, closeShowBills] = useModal(false)

  const { data: pagos } = useQuery({
    queryKey: ['balance-cobros', date],
    queryFn: async () => {
      return await getCobros(date)
    }
  })

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const particulares = Number(pagos?.particular?.total)
    const obrasocial = Number(pagos?.obraSocial?.total)

    const data = {
      labels: [`Particulares $${particulares}`, `Obra Social $${obrasocial}`],
      datasets: [
        {
          data: [particulares, obrasocial],
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
            // Corresponde a particulares
            setPayments(pagos?.particular?.pagos ?? [])
            openShowPaymentes()
          } else if (index === 1) {
            // Corresponde a transferencias
            setBills(pagos?.obraSocial?.pagos ?? [])
            openShowBills()
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
        <CobrosParticularesTable payments={payments} />
      </Dialog>
      <Dialog
        visible={showBills}
        onHide={closeShowBills}
      >
        <CobrosObraSocialTable payments={bills} />
      </Dialog>
      <h2>
        Cobros - Total: <span style={{ color: 'yellow' }}>${pagos?.total}</span>
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
