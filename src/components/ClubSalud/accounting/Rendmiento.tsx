import { PDFDownloadLink } from '@react-pdf/renderer'
import { useQuery } from '@tanstack/react-query'
import { RendimientoPDF } from 'components/pdf/RendimientoPDF'
import { Button } from 'primereact/button'
import { Chart } from 'primereact/chart'
import {
  getBalanceAnual,
  getCobrosAnual,
  getPagosAnual
} from 'queries/ClubSalud/balance'
import { useEffect, useRef, useState, type ReactElement } from 'react'

export default function Rendimiento(): ReactElement {
  const chartRef = useRef<Chart | null>(null)

  const { data: cobros } = useQuery({
    queryKey: ['cobro-anual'],
    queryFn: getCobrosAnual
  })

  const { data: pagos } = useQuery({
    queryKey: ['pagos-anual'],
    queryFn: getPagosAnual
  })

  const { data: balance } = useQuery({
    queryKey: ['balance-anual'],
    queryFn: getBalanceAnual
  })

  const [chartImage, setChartImage] = useState<any>(null)

  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--black')
    const textColorSecondary = documentStyle.getPropertyValue('--black')
    const surfaceBorder = 'rgb(0, 0, 0)'

    const data = {
      labels: cobros?.map((r) => r.month),
      datasets: [
        {
          label: 'Ingresos',
          data: cobros?.map((r) => r.cobros.total),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          backgroundColor: 'rgba(38, 114, 255, 0.2)'
        },
        {
          label: 'Egresos',
          data: pagos?.map((p) => p.pagos.total),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255, 38, 183, 0.2)'
        },
        {
          label: 'Balance',
          data: balance?.map((b) => b.balance.balance),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          tension: 0.4,
          backgroundColor: 'rgba(38, 255, 67, 0.2)'
        }
      ]
    }
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
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
  }, [pagos, cobros, balance])

  return (
    <div className='flex flex-column gap-4'>
      <Chart
        ref={chartRef}
        type='line'
        data={chartData}
        options={chartOptions}
      />
      {!chartImage && (
        <Button
          size='small'
          outlined
          icon='pi pi-download'
          iconPos='right'
          label='Exportar a PDF'
          onClick={() => {
            const chartInstance = chartRef.current?.getChart?.()
            const canvas = chartInstance?.canvas
            if (canvas) {
              const image = canvas.toDataURL()
              setChartImage(image)
            } else {
              console.log('Canva no esta listo')
            }
          }}
        />
      )}
      {chartImage && (
        <PDFDownloadLink
          document={
            <RendimientoPDF
              chartImage={chartImage}
              resumen={{
                ingresos:
                  cobros?.reduce(
                    (prev, current, _, array) =>
                      prev + (current.cobros?.total ?? 0),
                    0
                  ) ?? 0,
                egresos:
                  pagos?.reduce(
                    (prev, current, _, array) =>
                      prev + (current.pagos?.total ?? 0),
                    0
                  ) ?? 0,
                balance:
                  balance?.reduce(
                    (prev, current, _, array) =>
                      prev + (current.balance?.balance ?? 0),
                    0
                  ) ?? 0
              }}
            />
          }
          fileName='reporte-rendimiento.pdf'
        >
          {({ loading }) =>
            loading
              ? (
                  'Generando PDF...'
                )
              : (
              <Button
                label='Descargar PDF'
                size='small'
                outlined
                icon='pi pi-download'
                iconPos='right'
                className='w-full'
              />
                )
          }
        </PDFDownloadLink>
      )}
    </div>
  )
}
