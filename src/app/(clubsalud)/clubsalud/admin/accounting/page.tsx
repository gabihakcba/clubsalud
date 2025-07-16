'use client'

import { Card } from 'primereact/card'
import { useState, type ReactElement } from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import CobrosParticularesChart from 'components/ClubSalud/accounting/CobrosParticularesChart'
import { Calendar } from 'primereact/calendar'
import { DateUtils } from 'utils/ClubSalud/dates'
import { TabMenu } from 'primereact/tabmenu'
import CobrosChart from 'components/ClubSalud/accounting/CobrosChart'
import PagosChart from 'components/ClubSalud/accounting/PagosChart'
import BalanceChart from 'components/ClubSalud/accounting/BlanceChart'
import Rendimiento from 'components/ClubSalud/accounting/Rendmiento'

export default function Accounting(): ReactElement {
  const [date, setDate] = useState<Date>(DateUtils.getCurrentDate())
  const [activeIndex, setActiveIndex] = useState(0)
  const items = [
    { label: 'Balance', icon: 'pi pi-dollar' },
    { label: 'Cobros', icon: 'pi pi-receipt' },
    { label: 'Cobros particulares', icon: 'pi pi-wallet' },
    { label: 'Pagos', icon: 'pi pi-credit-card' },
    { label: 'Rendimiento', icon: 'pi pi-chart-line' }
  ]

  const renderComponent = (index: number): ReactElement => {
    switch (index) {
      case 0:
        return (
          <BalanceChart
            date={date}
            setActiveIndex={setActiveIndex}
          />
        )
      case 1:
        return <CobrosChart date={date} />
      case 2:
        return <CobrosParticularesChart date={date} />
      case 3:
        return <PagosChart date={date} />
      case 4:
        return <Rendimiento />
      default:
        return <h2>Elemento no seleccionado</h2>
    }
  }

  return (
    <Card className='h-screen overflow-scroll'>
      <ConfirmDialog />
      <Calendar
        value={date}
        placeholder='Filtrar por mes'
        dateFormat='mm/yy'
        view='month'
        disabled={activeIndex === 4}
        onChange={(e) => {
          setDate(DateUtils.newDate(e.value ?? ''))
        }}
      />
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index)
        }}
      />
      {renderComponent(activeIndex)}
    </Card>
  )
}
