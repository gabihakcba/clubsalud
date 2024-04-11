'use client'

import { useQuery } from '@tanstack/react-query'
import { getHealthPlans } from 'queries/health'
import { type ReactElement } from 'react'
import { type HealthPlan } from 'utils/types'
import HealthCard from './HealthCard'

export default function PromotionSection(): ReactElement {
  const { data } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await getHealthPlans()
      return response
    }
  })

  return (
    <section
      className='h-max scrollHidden'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(10rem,1fr))',
        alignContent: 'flex-start',
        gap: '1rem',
        width: '100%',
        margin: '1rem'
      }}
    >
      {data?.map((health: HealthPlan, index: number) => (
        <HealthCard
          key={index}
          plan={health}
        />
      ))}
    </section>
  )
}
