import { useQuery } from '@tanstack/react-query'
import { Chart } from 'primereact/chart'
import { getBalance } from 'queries/ClubSalud/balance'
import { type ReactElement, useEffect, useState } from 'react'

export default function BalanceChart({
  date,
  setActiveIndex
}: {
  date: Date
  setActiveIndex
}): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const { data: balance, isFetching } = useQuery({
    queryKey: ['balance', date],
    queryFn: async () => {
      return await getBalance(date)
    }
  })

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const ingresos = Number(balance?.ingresos)
    const egresos = Number(balance?.egresos)

    const data = {
      labels: [`Ingresos $${ingresos}`, `Egresos $${egresos}`],
      datasets: [
        {
          data: [ingresos, egresos],
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
            setActiveIndex(1)
          } else if (index === 1) {
            setActiveIndex(3)
          }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [balance])

  return (
    <div className='card flex flex-column justify-content-center align-items-center'>
      {isFetching && <p>Cargando</p>}
      {!isFetching && (
        <>
          <h2>
            Balance:{' '}
            <span style={{ color: 'yellow' }}>${balance?.balance}</span>
          </h2>
          <Chart
            type='pie'
            data={chartData}
            options={chartOptions}
            className='w-full md:w-30rem'
          />
        </>
      )}
    </div>
  )
}
