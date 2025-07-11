'use client'

import { useQuery } from '@tanstack/react-query'
import { Chart } from 'primereact/chart'
import { Dialog } from 'primereact/dialog'
import { getPagos } from 'queries/ClubSalud/balance'
import { useEffect, useState, type ReactElement } from 'react'
import {
  type EmployeePayment,
  type InstructorPayment
} from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import PagosProfesoresTable from './PagosProfesoresTable'
import PagosEmpleadosTable from './PagosEmpleadosTable'

export default function PagosChart({ date }: { date: Date }): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [instructorPayments, setInstructorPayments] = useState<
  InstructorPayment[]
  >([])
  const [employeePayments, setEmployeePayments] = useState<EmployeePayment[]>(
    []
  )
  const [showIntructor, openShowInstructor, closeShowInstructor] = useModal(false)
  const [showEmployee, openShowEmployee, closeShowEmployee] = useModal(false)

  const { data: pagos } = useQuery({
    queryKey: ['balance-pagos', date],
    queryFn: async () => {
      return await getPagos(date)
    }
  })

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const profesores = Number(pagos?.pagosProfesores?.total)
    const empleados = Number(pagos?.pagosEmpleados?.total)

    const data = {
      labels: [`Profesores $${profesores}`, `Empleados $${empleados}`],
      datasets: [
        {
          data: [profesores, empleados],
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
            setInstructorPayments(pagos?.pagosProfesores?.pagos ?? [])
            openShowInstructor()
          } else if (index === 1) {
            // Corresponde a transferencias
            setEmployeePayments(pagos?.pagosEmpleados?.pagos ?? [])
            openShowEmployee()
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
        visible={showIntructor}
        onHide={closeShowInstructor}
      >
        <PagosProfesoresTable payments={instructorPayments} />
      </Dialog>
      <Dialog
        visible={showEmployee}
        onHide={closeShowEmployee}
      >
        <PagosEmpleadosTable payments={employeePayments} />
      </Dialog>
      <h2>
        Pagos - Total: <span style={{ color: 'yellow' }}>${pagos?.total}</span>
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
