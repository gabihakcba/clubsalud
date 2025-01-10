'use client'

import ChartMemberReport from 'components/ClubSalud/report/ChartMemberReport'
import ChartSubscriptionsReport from 'components/ClubSalud/report/ChartSubscriptionsReport'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'

export default function Reports(): ReactElement {
  return (
    <Card className='h-screen overflow-scroll'>
      <div className='flex flex-column gap-8'>
        <ChartMemberReport />
        <ChartSubscriptionsReport />
      </div>
    </Card>
  )
}