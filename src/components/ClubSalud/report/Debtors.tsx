import { Card } from 'primereact/card'
import { useState, type ReactElement } from 'react'
import { type Subscription, type Member } from 'utils/ClubSalud/types'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useModal } from 'utils/ClubSalud/useModal'
import { argDate2Format } from 'utils/ClubSalud/dates'

const subsciptionsNotPaid = (member: Member | null): Subscription[] => {
  const current = member?.memberSubscription?.filter(
    (subs: Subscription) => !subs.paid
  )
  return current ?? []
}

export default function Debtors({
  debtors
}: {
  debtors: Member[]
}): ReactElement {
  const [debts, openDebts, closeDebts] = useModal(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

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
                <div>{argDate2Format(data.initialDate)}</div>
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
              header='Total'
              field='total'
            />
          </DataTable>
        </Card>
      </Dialog>
      <Card>
        <DataTable value={debtors}>
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
                  <b className='bg-red-400 p-1 border-round'>${subsciptionsNotPaid(member)[0].remaining.toString()}</b>
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
