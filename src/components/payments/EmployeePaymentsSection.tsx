import Modal from 'components/Modal'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import CreateEmployeePaymentForm from './CreateEmployeeParymentForm'
import { type EmployeePayment } from 'utils/types'
import EmployeePaymentCard from './EmployeePaymentCard'

interface params {
  employeePayments: EmployeePayment[] | undefined
}
export function EmplooyeePaymentsSection({
  employeePayments
}: params): ReactElement {
  const [createPayment, openPayment, closePayment] = useModal(false)
  return (
    <div className='flex flex-col'>
      <nav className='flex justify-start items-center gap-2 p-2'>
        <h3 className='text-2xl font-bold'>Pagos a empleados</h3>
        <button
          className='blueButtonForm p-1'
          onClick={openPayment}
        >
          Generar pago
        </button>
        <Modal
          isOpen={createPayment}
          closeModal={closePayment}
        >
          <CreateEmployeePaymentForm
            closeModal={closePayment}
          ></CreateEmployeePaymentForm>
        </Modal>
      </nav>
      <hr className='m-1' />
      <section
        className='mt-5 ml-5 h-full'
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(12rem,1fr))',
          gap: '1rem',
          alignContent: 'flex-start'
        }}
      >
        {employeePayments?.map((employeePayment, index) => (
          <EmployeePaymentCard
            employeePayment={employeePayment}
            key={index}
          ></EmployeePaymentCard>
        ))}
      </section>
      <hr className='m-1' />
    </div>
  )
}
