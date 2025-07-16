import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type Payment } from 'utils/ClubSalud/types'

export default function CobrosParticularesTable({
  payments
}: {
  payments: Payment[]
}): ReactElement {
  return (
    <DataTable value={payments}>
      <Column
        header='ID'
        field='id'
      />
      <Column
        header='Nombre | Appelido'
        field='Member.name'
        body={(row: Payment) => (
          <p>
            {row.Member?.name} {row.Member?.lastName}
          </p>
        )}
      />
      <Column
        header='DNI'
        field='Member.dni'
      />
      <Column
        header='Monto'
        field='amount'
        body={(row: Payment) => <p>${row.amount}</p>}
      />
      <Column
        header='Fecha'
        field='date'
        body={(row: Payment) => <p>{DateUtils.formatToDDMMYY(row.date)}</p>}
      />
      <Column
        header='Oferta'
        field='Subscription.Plan.title'
      />
      <Column
        header='Plan'
        field='Subscription.Promotion.title'
      />
    </DataTable>
  )
}
