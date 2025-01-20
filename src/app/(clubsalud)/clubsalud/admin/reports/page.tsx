'use client'

import ChartMemberReport from 'components/ClubSalud/report/ChartMemberReport'
import ChartOSSubscriptionsReport from 'components/ClubSalud/report/ChartOSSubscriptionsResport'
import ChartSubscriptionsReport from 'components/ClubSalud/report/ChartSubscriptionsReport'
import MonthSubscriptions from 'components/ClubSalud/report/MonthSubscriptions'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'

export default function Reports(): ReactElement {
  return (
    <Card className='h-screen overflow-scroll'>
      <div className='flex flex-column gap-8'>
        <ChartMemberReport />
        <ChartSubscriptionsReport />
        <ChartOSSubscriptionsReport />
        <MonthSubscriptions/>
      </div>
    </Card>
  )
}
