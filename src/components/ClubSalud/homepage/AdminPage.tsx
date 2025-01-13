import CreateNotificationForm from 'components/ClubSalud/notifications/CreateNotificationForm'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import AttendanceInstructorForm from 'components/ClubSalud/attendanceInstructor/AttendanceInstructorForm'
import RegistrationFormSelector from 'components/ClubSalud/medicalReports/RegistrationFormSelector'
import HealthAssignForm from 'components/ClubSalud/healthPlans/HealthAssignForm'
import SubscriptionForm from 'components/ClubSalud/subscriptions/SubscriptionForm'
import { Fieldset } from 'primereact/fieldset'
import CreatePaymentForm from 'components/ClubSalud/bills/CreatePaymentForm'
import CreateEmployeePaymentForm from 'components/ClubSalud/payments/CreateEmployeePaymentForm'
import CreateInstructorPaymentForm from 'components/ClubSalud/payments/CreateInstructorPaymentForm'
import { Card } from 'primereact/card'
import NewAttendanceMember from 'components/ClubSalud/attendance/NewAttendanceMember'

export default function AdminPage(): ReactElement {
  const [showAssignHealthPlan, openAssignHealthPlan, closeAssignHealthPlan] =
    useModal(false)
  const [create, openCreate, closeCreate] = useModal(false)
  const [createSubscription, openCreateSubscription, closeCreateSubscription] =
    useModal(false)
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
  const [createPayment, openPayment, closePayment] = useModal(false)
  const [createEmployeePayment, openEmployeePayment, closeEmployeePayment] =
    useModal(false)
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
        visible={createEmployeePayment}
        onHide={closeEmployeePayment}
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
        <div className='flex w-full gap-4'>
          <RegistrationFormSelector />
          <Button
            label='Abrir asistencia'
            link
            onClick={() => {
              window.open(
                `${process.env.NEXT_PUBLIC_NODE_PATH}/clubsalud/admin/direct-attendance`
              )
            }}
          />
        </div>
        <Fieldset legend='Asistencias'>
          <section className='flex gap-8'>
            <NewAttendanceMember />
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
              onClick={openEmployeePayment}
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
