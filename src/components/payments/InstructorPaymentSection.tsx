import Modal from 'components/Modal'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import { type InstructorPayment } from 'utils/types'
import InstructorPaymentCard from './InstructorPaymentCard'
import CreateInstructorPaymentForm from './CreateInstructorPaymentForm'

interface params {
  instructorPayments: InstructorPayment[] | undefined
}
export function InstructorPaymentsSection({
  instructorPayments
}: params): ReactElement {
  const [createPayment, openPayment, closePayment] = useModal(false)
  return (
    <div className='flex flex-col'>
      <nav className='flex justify-start items-center gap-2 p-2'>
        <h3 className='text-2xl font-bold'>Pagos a profesores</h3>
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
          <CreateInstructorPaymentForm
            closeModal={closePayment}
          ></CreateInstructorPaymentForm>
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
        {instructorPayments?.map((instructorPayment, index) => (
          <InstructorPaymentCard
            instructorPayment={instructorPayment}
            key={index}
          ></InstructorPaymentCard>
        ))}
      </section>
      <hr className='m-1' />
    </div>
  )
}
