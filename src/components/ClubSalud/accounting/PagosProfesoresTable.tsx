import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type InstructorPayment } from 'utils/ClubSalud/types'

export default function PagosProfesoresTable({
  payments
}: {
  payments: InstructorPayment[]
}): ReactElement {
  return (
    <DataTable value={payments}>
      <Column
        field='id'
        header='ID'
      />
      <Column
        field='Instructor.name'
        header='Nombre | Apellido'
        body={(row: InstructorPayment) => (
          <p>
            {row.Instructor?.name} {row.Instructor?.lastName}
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
        body={(row: InstructorPayment) => (
          <p>{DateUtils.formatToDDMMYY(row.paymentDate)}</p>
        )}
      />
    </DataTable>
  )
}
