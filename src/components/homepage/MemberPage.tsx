import moment from 'moment'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { type Account } from 'utils/types'

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
  return <Card title='Suscripción actual'>{account && lastSubs(account)}</Card>
}
