import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { type ReactElement } from 'react'
import { type Subscription } from 'utils/ClubSalud/types'

export default function SubscriptionsToBillTable({
  subscriptions,
  isLoading = false
}: {
  subscriptions: Subscription[],
  isLoading?: boolean
}): ReactElement {
  return <DataTable value={subscriptions} scrollable scrollHeight='40dvh' loading={isLoading}>
    <Column header='id' field='id'/>
    <Column header='Oferta' field='plan.title'/>
    <Column header='Nombre' field='member.name'/>
    <Column header='Apellido' field='member.lastName'/>
    <Column header='DNI' field='member.dni'/>
  </DataTable>
}
