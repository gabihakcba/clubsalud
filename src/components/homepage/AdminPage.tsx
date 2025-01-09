import CreateNotificationForm from 'components/notifications/CreateNotificationForm'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import AttendanceInstructorForm from 'components/attendanceInstructor/AttendanceInstructorForm'
import RegistrationFormSelector from 'components/medicalReports/RegistrationFormSelector'
import HealthAssignForm from 'components/healthPlans/HealthAssignForm'
import SubscriptionForm from 'components/subscriptions/SubscriptionForm'
import { Fieldset } from 'primereact/fieldset'
import CreatePaymentForm from 'components/bills/CreatePaymentForm'
import CreateEmployeePaymentForm from 'components/payments/CreateEmployeePaymentForm'
import CreateInstructorPaymentForm from 'components/payments/CreateInstructorPaymentForm'
import { Card } from 'primereact/card'
import NewAttendanceMember from 'components/attendance/NewAttendanceMember'

export default function AdminPage(): ReactElement {
  const [showAssignHealthPlan, openAssignHealthPlan, closeAssignHealthPlan] =
    useModal(false)
  const [create, openCreate, closeCreate] = useModal(false)
  const [createSubscription, openCreateSubscription, closeCreateSubscription] =
    useModal(false)
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
  const [createPayment, openPayment, closePayment] = useModal(false)

  return (
    <Card className='flex flex-column'>
      <Dialog
        visible={showAssignHealthPlan}
        onHide={closeAssignHealthPlan}
        header='Asignar Obra Social'
      >
        <HealthAssignForm />
      </Dialog>
      <Dialog
        visible={create}
        onHide={closeCreate}
        header='Crear Notificación'
      >
        <CreateNotificationForm />
      </Dialog>
      <Dialog
        header='Inscripción'
        visible={createSubscription}
        onHide={closeCreateSubscription}
      >
        <SubscriptionForm />
      </Dialog>
      <Dialog
        header='Generar Cobro'
        visible={createBill}
        onHide={closeCreateBill}
      >
        <CreatePaymentForm />
      </Dialog>
      <Dialog
        visible={createPayment}
        onHide={closePayment}
        header='Generar Pago'
      >
        <CreateEmployeePaymentForm closeModal={closePayment} />
      </Dialog>
      <Dialog
        visible={createPayment}
        onHide={closePayment}
        header='Generar Pago'
      >
        <CreateInstructorPaymentForm />
      </Dialog>

      <main className='flex flex-column justify-content-center gap-4'>
        <RegistrationFormSelector />
        <Fieldset legend='Asistencias'>
          <section className='flex gap-8'>
            <NewAttendanceMember/>
            <AttendanceInstructorForm />
          </section>
        </Fieldset>
        <Fieldset legend='Cobros y pagos'>
          <section className='flex gap-4'>
            <Button
              onClick={openCreateBill}
              size='small'
              outlined
              label='Generar Cobro'
              icon='pi pi-plus'
              iconPos='right'
            />
            <Button
              onClick={openPayment}
              label='Generar Pago Profesor'
              size='small'
              outlined
              icon='pi pi-plus'
              iconPos='right'
            />
            <Button
              onClick={openPayment}
              label='Generar Pago Empleado'
              size='small'
              outlined
              icon='pi pi-plus'
              iconPos='right'
            />
          </section>
        </Fieldset>
        <Fieldset legend='Extras'>
          <section className='flex gap-4'>
            <Button
              label='Asignar Obra Social'
              size='small'
              outlined
              icon='pi pi-plus'
              iconPos='right'
              onClick={openAssignHealthPlan}
            />
            <Button
              label='Inscribir'
              size='small'
              outlined
              icon='pi pi-plus-circle'
              iconPos='right'
              onClick={openCreateSubscription}
            />
            <Button
              label='Crear Notificación'
              size='small'
              outlined
              icon='pi pi-plus'
              iconPos='right'
              onClick={openCreate}
            />
          </section>
        </Fieldset>
      </main>
    </Card>
  )
}
