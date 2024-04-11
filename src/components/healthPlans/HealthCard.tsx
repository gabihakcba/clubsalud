import { type ReactElement } from 'react'
import { type HealthPlan } from 'utils/types'

interface params {
  plan: HealthPlan
}
export default function HealthCard({ plan }: params): ReactElement {
  return (
    <div className='flex flex-col gap-2 border rounded p-4'>
      <div>{plan.name}</div>
      <hr />
      <div>{plan.type}</div>
      <hr />
      <div>{plan.paymentPerConsultation}</div>
      <hr />
      <div>{plan.description}</div>
    </div>
  )
}
