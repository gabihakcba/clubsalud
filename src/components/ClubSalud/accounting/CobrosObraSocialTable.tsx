import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type BilledConsultation } from 'utils/ClubSalud/types'

export default function CobrosLista({
  payments
}: {
  payments: BilledConsultation[]
}): ReactElement {
  return (
    <DataTable value={payments}>
      <Column
        header='ID'
        field='id'
      />
      <Column
        header='Nombre | Appelido'
        field='Subscription.Member.name'
        body={(row: BilledConsultation) => (
          <p>
            {row.Subscription?.Member?.name} {row.Subscription.Member?.lastName}
          </p>
        )}
      />
      <Column
        header='DNI'
        field='Subscription.Member.dni'
      />
      <Column
        header='Monto'
        field='amount'
        body={(row: BilledConsultation) => <p>${row.amount}</p>}
      />
      <Column
        header='Fecha'
        field='date'
        body={(row: BilledConsultation) => (
          <p>{DateUtils.formatToDDMMYY(row.date)}</p>
        )}
      />
      <Column
        header='Oferta'
        field='Subscription.Plan.title'
      />
      <Column
        header='Plan'
        field='Subscription.Promotion.title'
      />
      <Column
        header='Obra Social'
        field='HealthPlanSubscribed.HealthPlan.name'
        body={(row: BilledConsultation) => (
          <p>{row.HealthPlanSubscribed.HealthPlan?.name}</p>
        )}
      />
    </DataTable>
  )
}
