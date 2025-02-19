import { useState, type ReactElement } from 'react'
import {
  type Subscription,
  type Member,
  type BilledConsultation
} from 'utils/ClubSalud/types'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useModal } from 'utils/ClubSalud/useModal'
import {
  argDate2Format,
  argIsBetween,
  isSameMonth
} from 'utils/ClubSalud/dates'
import { Tag } from 'primereact/tag'
import HealthPlanBillForm from '../bills/HealthPlanBillForm'
import moment from 'moment'

const subsciptionsNotPaid = (
  member: Member | null,
  date: Date
): Subscription[] => {
  const current = member?.memberSubscription?.filter(
    (subscription: Subscription) =>
      (isSameMonth(date, subscription.expirationDate) ||
        argIsBetween(
          moment(date).endOf('month').toDate(),
          subscription.initialDate,
          subscription.expirationDate
        )) &&
      (subscription.billedConsultation?.length ?? 0) <
        subscription.plan.durationMonth * 2
  )
  return current ?? []
}

export default function SubscriptionsPending({
  member,
  date
}: {
  member: Member | null
  date: Date
}): ReactElement {
  const [bill, openBill, closeBill] = useModal(false)
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null)
  const [selectedBills, setSelectedBills] = useState<any>(null)

  const allowExpansion = (subscription: Subscription): boolean => {
    return (subscription?.billedConsultation?.length ?? 0) > 0
  }

  const rowExpansionTemplate = (subscription: Subscription): ReactElement => {
    return (
      <DataTable value={subscription.billedConsultation}>
        <Column
          header='Número de autorización'
          field='autorizationNumber'
        />
        <Column
          header='Fecha'
          body={(billedConsultation: BilledConsultation) => {
            return <span>{argDate2Format(billedConsultation.date)}</span>
          }}
        />
      </DataTable>
    )
  }

  return (
    <>
      <Dialog
        onHide={closeBill}
        visible={bill}
      >
        <HealthPlanBillForm
          member={member}
          subscriptionId={selectedSubscription?.id ?? 0}
        />
      </Dialog>
      <DataTable
        value={subsciptionsNotPaid(member, date)}
        header={`${member?.name} ${member?.lastName} ${member?.dni}`}
        rowExpansionTemplate={(selectedSubscription) =>
          rowExpansionTemplate(selectedSubscription)
        }
        expandedRows={selectedBills}
        onRowToggle={(e) => {
          setSelectedBills(e.data)
        }}
        dataKey='id'
        scrollable
        scrollHeight='30rem'
      >
        <Column
          expander={allowExpansion}
          style={{ width: '5rem' }}
        />
        <Column
          header='ID'
          field='id'
        />
        <Column
          header='Desde'
          body={(data: Subscription) => (
            <div>{argDate2Format(data.initialDate)}</div>
          )}
        />
        <Column
          header='Hasta'
          body={(data: Subscription) => (
            <div>{argDate2Format(data.expirationDate)}</div>
          )}
        />
        <Column
          header='Plan'
          field='promotion.title'
        />
        <Column
          header='Oferta'
          field='plan.title'
        />
        <Column
          header='Deuda'
          body={(s: Subscription) => {
            const debts =
              s.plan.durationMonth * 2 - (s.billedConsultation?.length ?? 0)
            return (
              <Tag severity={debts > 1 ? 'danger' : 'warning'}>{debts}</Tag>
            )
          }}
        />
        <Column
          body={(subscription: Subscription) => (
            <Button
              label='Cargar'
              outlined
              size='small'
              icon='pi pi-plus'
              iconPos='right'
              onClick={() => {
                setSelectedSubscription(subscription)
                openBill()
              }}
            />
          )}
        />
      </DataTable>
    </>
  )
}
