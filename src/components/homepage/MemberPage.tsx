import moment from 'moment'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'
import { type ReactElement } from 'react'
import { type Account } from 'utils/types'

const classesAndInstructors = (acc: Account | undefined): ReactElement => {
  return (
    <div>
      {acc?.memberAccount?.scheduleInscription?.map((sch) => (
        <div
          key={sch.id}
          className='flex gap-2'
        >
          <p>
            Clase: <Tag severity='success'>{sch.schedule.class?.name}</Tag>
          </p>
          <p>Profesor/a: <Tag severity='info'>{sch.schedule.charge?.name}</Tag></p>
        </div>
      ))}
    </div>
  )
}

const lastSubs = (acc: Account | undefined): ReactElement => {
  const subs = acc?.memberAccount?.memberSubscription?.filter(
    (sub) => sub.active
  )

  if (!subs || subs?.length < 1) {
    return <>No contas con una suscripción válida</>
  }

  const sub = subs[0]
  return (
    <div className='flex flex-column'>
      <p>Promoción: {sub?.promotion?.title}</p>
      <p>Clases restantes: {sub?.remainingClasses}</p>
      <p>Vencimiento: {moment(sub?.expirationDate).format('DD-MM-YY')} </p>
    </div>
  )
}

export default function MemberPage({
  account
}: {
  account: Account | undefined
}): ReactElement {
  return (
    <div className='flex flex-column gap-2'>
      <Card title='Suscripción actual'>{account && lastSubs(account)}</Card>
      <Card title='Inscripciones'>{classesAndInstructors(account)}</Card>
    </div>
  )
}
