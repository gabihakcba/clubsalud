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
    <Column header='Oferta' field='Plan.title'/>
    <Column header='Nombre' field='Member.name'/>
    <Column header='Apellido' field='Member.lastName'/>
    <Column header='DNI' field='Member.dni'/>
  </DataTable>
}
