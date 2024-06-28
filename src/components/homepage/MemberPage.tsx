import moment from 'moment'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { Account } from 'utils/types'

const lastSubs = (acc: Account | undefined) => {
  const subs = acc?.memberAccount?.memberSubscription?.filter(
    (sub) => sub.active
  )
  if (!subs || subs?.length < 1) return 'No contas con una suscripción válida'
  const sub = subs[0]
  return (
    <div className='flex flex-column'>
      <p>Promoción: {sub?.promotion?.title}</p>
      <p>Clases restantes: {sub?.remainingClasses}</p>
      <p>Vencimiento: {moment(sub?.expirationDate).format('DD-MM-YY')} </p>
    </div>
  )
}

export default function MemberPage({ account }): ReactElement {
  return <Card title='Suscripción actual'>{account && lastSubs(account)}</Card>
}
