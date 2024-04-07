import { type ReactElement, useEffect, useState } from 'react'
import { type Member, type Promotion } from 'utils/types'

const getTotalPaid = (members): number => {
  let total = 0
  members?.forEach((member) => {
    member?.memberSubscription?.forEach((subs) => {
      total += subs.total - subs.remaining
    })
  })
  return total
}

const getTotalRemaining = (members): number => {
  let total = 0
  members?.forEach((member) => {
    member?.memberSubscription?.forEach((subs) => {
      total += subs.remaining
    })
  })
  return total
}

const takePromotion = (promotions, id): string => {
  const prom = promotions?.find((promotion) => promotion.id === id)
  return prom?.title
}

interface params {
  members: Member[] | undefined
  promotions: Promotion[] | undefined
}
export default function SubscriptionSection({
  members,
  promotions
}: params): ReactElement {
  const [totalRemaining, setTotalRemaining] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)

  useEffect(() => {
    const paid = getTotalPaid(members)
    setTotalPaid(paid)
    const rem = getTotalRemaining(members)
    setTotalRemaining(rem)
  }, [members])

  return (
    <div>
      <div className='w-max h-max my-2'>
        <div className='flex justify-between gap-2'>
          <p className=''>Total pagado: </p>
          <div className='bg-green-300 px-2'>{totalPaid}</div>
        </div>
        <div className='flex justify-between gap-2'>
          <p>Total adeudado: </p>
          <p className='bg-red-300 px-2'>{totalRemaining}</p>
        </div>
      </div>
      <section
        className='h-max scrollHidden self-center p-4 border-b-2 border-black'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(5rem,1fr))',
          gap: '1rem',
          alignContent: 'flex-start',
          justifyItems: 'center',
          width: '100%'
        }}
      >
        <p>Alumno</p>
        <p>Pagado?</p>
        <p>Por pagar</p>
        <p>Precio del plan</p>
        <p>Plan</p>
      </section>
      <section
        className='h-max scrollHidden self-center p-4'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(5rem,1fr))',
          alignContent: 'flex-start',
          justifyItems: 'center',
          width: '100%'
        }}
      >
        {members?.map((mem) => (
          <>
            {mem.memberSubscription?.map((subs) => (
              <>
                <p className='border-l-2 border-b-2 w-full h-full text-center p-2'>
                  {mem.name}
                </p>
                <p className='border-l-2 border-b-2 w-full h-full text-center p-2'>
                  {subs.paid ? 'Pagado' : 'Adeuda'}
                </p>
                <p className='border-l-2 border-b-2 w-full h-full text-center p-2'>
                  {subs.remaining}
                </p>
                <p className='border-l-2 border-b-2 w-full h-full text-center p-2'>
                  {subs.total}
                </p>
                <p className='border-l-2 border-b-2 w-full h-full text-center p-2'>
                  {takePromotion(promotions, subs.promotionId)}
                </p>
              </>
            ))}
          </>
        ))}
      </section>
    </div>
  )
}
