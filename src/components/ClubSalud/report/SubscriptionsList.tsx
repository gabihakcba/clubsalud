import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { type ReactElement } from 'react'
import { argDate2Format } from 'utils/ClubSalud/dates'
import { type Subscription } from 'utils/ClubSalud/types'

export default function SubscriptionList({
  subscriptionList
}: {
  subscriptionList: Subscription[]
}): ReactElement {
  return (
    <DataTable
      value={subscriptionList}
      scrollable
      scrollHeight='35rem'
    >
      <Column
        header='ID'
        field='id'
      />
      <Column
        header='Oferta'
        field='plan.title'
      />
      <Column
        header='Plan'
        field='promotion.title'
      />
      <Column
        header='Pagado'
        body={(subscription) => (
          <Tag severity={subscription.paid ? 'success' : 'danger'}>
            {subscription.paid ? 'Pagado' : 'No Pagado'}
          </Tag>
        )}
      />
      <Column
        header='Fecha de inicio'
        field='initialDate'
        body={(subscription: Subscription) => (
          <div>{argDate2Format(subscription.initialDate)}</div>
        )}
      />
      <Column
        header='Fecha de vencimiento'
        field='expirationDate'
        body={(subscription: Subscription) => (
          <div>{argDate2Format(subscription.expirationDate)}</div>
        )}
      />
      <Column
        header='Alumno'
        body={(subscription: Subscription) => (
          <div>
            {subscription.member.lastName} {subscription.member.name}{' '}
            {subscription.member.dni}
          </div>
        )}
      />
    </DataTable>
  )
}
