'use client'

import { useQuery } from '@tanstack/react-query'
import Modal from 'components/Modal'
import BilledConsultationCard from 'components/bills/BilledConsultationCard'
import CreatePaymentForm from 'components/bills/CreatePaymentForm'
import PaymentCard from 'components/bills/PaymentCard'
import { getBilled, getPayments } from 'queries/payments'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function Page(): ReactElement {
  const [isOpen, openModal, closeModal] = useModal(false)
  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      return await getPayments()
    }
  })
  const { data: billed } = useQuery({
    queryKey: ['billed'],
    queryFn: async () => {
      return await getBilled()
    }
  })
  return (
    <div className='pr-6 pb-6 flex flex-col'>
      <button
        className='blueButtonForm m-2 w-max'
        onClick={openModal}
      >
        Generar cobro
      </button>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <CreatePaymentForm closeModal={closeModal}></CreatePaymentForm>
      </Modal>
      <hr className='m-2' />
      <h2 className='text-xl font-bold ml-6'>Cobros particulares</h2>
      <hr className='m-2' />
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
        {payments?.map((payment, index) => (
          <PaymentCard
            payment={payment}
            key={index}
          />
        ))}
      </section>
      <hr className='m-2' />
      <h2 className='text-xl font-bold ml-6'>Consultas cobradas</h2>
      <hr className='m-2' />
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
        {billed?.map((billed, index) => (
          <BilledConsultationCard
            billed={billed}
            key={index}
          />
        ))}
      </section>
    </div>
  )
}
