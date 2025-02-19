import { useState, type ReactElement } from 'react'
import { type Subscription, type Member } from 'utils/ClubSalud/types'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useModal } from 'utils/ClubSalud/useModal'
import { arg2Date, argDate, argIsBetween, isSameMonth } from 'utils/ClubSalud/dates'
import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/ClubSalud/members'
import { Calendar } from 'primereact/calendar'
import SubscriptionsPending from './SubscriptionsPending'
import moment from 'moment'

const hasDebt = (subscriptions: Subscription[], date: Date): boolean => {
  return subscriptions.some(
    (subscription: Subscription) =>
      (isSameMonth(date, subscription.expirationDate) ||
      argIsBetween(moment(date).endOf('month').toDate(), subscription.initialDate, subscription.expirationDate)) &&
      (subscription.billedConsultation?.length ?? 0) <
        subscription.plan.durationMonth * 2
  )
}

const getDebtors = (members: Member[], date: Date): Member[] => {
  const debtors = members.filter((member: Member) =>
    hasDebt(member.memberSubscription ?? [], date)
  )
  return debtors
}

export default function PendingOSBills(): ReactElement {
  const [date, setDate] = useState<Date>(argDate())
  const [debts, openDebts, closeDebts] = useModal(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const { data: members, isFetching } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  return (
    <>
      <Dialog
        onHide={closeDebts}
        visible={debts}
      >
        <SubscriptionsPending member={selectedMember} date={date}/>
      </Dialog>
      <DataTable
        value={getDebtors(members ?? [], date)}
        loading={isFetching}
        header={() => (
          <div>
            <h3>Deudores</h3>{' '}
            <Calendar
              value={date}
              onChange={(e) => {
                e.value && setDate(arg2Date(e.value))
              }}
              view='month'
              dateFormat='mm/yy'
            />
          </div>
        )}
        emptyMessage='No hay deudores para este mes'
      >
        <Column
          header='ID'
          field='id'
        />
        <Column
          header='Nombre'
          field='name'
        />
        <Column
          header='Apellido'
          field='lastName'
        />
        <Column
          header='DNI'
          field='dni'
        />
        <Column
          header='Teléfono'
          field='phoneNumber'
        />
        <Column
          header='Deuda'
          body={(member: Member) => {
            // const total = getDebts(member, date)
            // const severity = total > 1 ? 'danger' : 'warning'
            return (
              <div className='flex gap-2 align-items-center justify-content-center'>
                {/* <Tag severity={severity}>{total}</Tag> */}
                <Button
                  label='Ver todas las deudas'
                  size='small'
                  link
                  severity='warning'
                  onClick={() => {
                    setSelectedMember(member)
                    openDebts()
                  }}
                  className='text-orange-500'
                />
              </div>
            )
          }}
        />
      </DataTable>
    </>
  )
}
