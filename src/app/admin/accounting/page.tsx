import { Card } from 'primereact/card'
import { TabView, TabPanel } from 'primereact/tabview'
import { type ReactElement } from 'react'
import BillsTable from 'components/accounting/BillsTable'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { InstructorPaymentsSection } from 'components/payments/InstructorPaymentSection'
import { EmployeePaymentsSection } from 'components/payments/EmployeePaymentsSection'
import ExtraCostSection from 'components/extraCost/ExtraCostSection'

export default function Accounting(): ReactElement {
  return (
    <Card className='h-full'>
      <ConfirmDialog />
      <TabView>
        <TabPanel header='Cobros'>
          <BillsTable />
        </TabPanel>
        <TabPanel header='Pagos'>
          <TabView>
            <TabPanel header='Profesores'>
              <InstructorPaymentsSection />
            </TabPanel>
            <TabPanel header='Empleados'>
              <EmployeePaymentsSection />
            </TabPanel>
          </TabView>
        </TabPanel>
        <TabPanel header='Gastos Extra'>
          <ExtraCostSection />
        </TabPanel>
      </TabView>
    </Card>
  )
}
