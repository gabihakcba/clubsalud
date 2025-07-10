import { Card } from 'primereact/card'
import { useEffect, useState, type ReactElement } from 'react'
import { type Subscription, type Member } from 'utils/ClubSalud/types'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useModal } from 'utils/ClubSalud/useModal'
import { DateUtils } from 'utils/ClubSalud/dates'
import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/ClubSalud/members'

const subsciptionsNotPaid = (member: Member | null): Subscription[] => {
  const current = member?.Subscription?.filter(
    (subs: Subscription) => !subs.paid
  )
  return current ?? []
}

const hasSubscriptionNotPaid = (
  subscriptions: Subscription[],
  date: Date
): boolean => {
  return subscriptions.some(
    (subscription) =>
      !subscription.paid &&
      DateUtils.isSameMonth(subscription.initialDate, date) &&
      DateUtils.isSameYear(subscription.initialDate, date)
  )
}

const getDebtors = (members: Member[], date: Date): Member[] => {
  return members.filter((member: Member) =>
    hasSubscriptionNotPaid(member.Subscription ?? [], date)
  )
}

export default function Debtors({ date }: { date: Date }): ReactElement {
  const [debts, openDebts, closeDebts] = useModal(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [debtors, setDebtors] = useState<Member[]>([])

  const { data: members, isFetching } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  useEffect(() => {
    setDebtors(getDebtors(members ?? [], date))
  }, [members, date])

  return (
    <>
      <Dialog
        onHide={closeDebts}
        visible={debts}
      >
        <Card>
          <DataTable
            value={subsciptionsNotPaid(selectedMember)}
            header={`${selectedMember?.name} ${selectedMember?.lastName} ${selectedMember?.dni}`}
          >
            <Column
              header='ID'
              field='id'
            />
            <Column
              header='Faltante'
              field='remaining'
            />
            <Column
              header='Fecha de inscripción'
              body={(data: Subscription) => (
                <div>{DateUtils.formatToDDMMYY(data.initialDate)}</div>
              )}
            />
            <Column
              header='Plan'
              field='Promotion.title'
            />
            <Column
              header='Oferta'
              field='Plan.title'
            />
            <Column
              header='Total'
              field='total'
            />
          </DataTable>
        </Card>
      </Dialog>
      <Card>
        <DataTable
          value={debtors}
          loading={isFetching}
          header={`Deudores totales ${debtors.length}`}
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
            header='Ultima deuda'
            body={(member: Member) => {
              return (
                <div className='flex gap-2 align-items-center justify-content-center'>
                  <b className='bg-red-400 p-1 border-round'>
                    ${subsciptionsNotPaid(member)[0].remaining.toString()}
                  </b>
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
      </Card>
    </>
  )
}
