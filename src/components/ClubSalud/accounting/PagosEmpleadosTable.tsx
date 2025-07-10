import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type EmployeePayment } from 'utils/ClubSalud/types'

export default function PagosEmpleadosTable({
  payments
}: {
  payments: EmployeePayment[]
}): ReactElement {
  return <DataTable value={payments}>
    <Column
            field='id'
            header='ID'
          />
          <Column
            field='Instructor.name'
            header='Nombre | Apellido'
            body={(row: EmployeePayment) => (
              <p>
                {row.Employee?.name} {row.Employee?.lastName}
              </p>
            )}
          />
          <Column
            field='Instructor.dni'
            header='DNI'
          />
          <Column
            field='amount'
            header='Monto'
          />
          <Column
            field='date'
            header='Fecha'
            body={(row: EmployeePayment) => (
              <p>{DateUtils.formatToDDMMYY(row.date)}</p>
            )}
          />
  </DataTable>
}
