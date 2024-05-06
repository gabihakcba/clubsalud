'use client'

import { useQuery } from '@tanstack/react-query'
import BilledConsultationCard from 'components/bills/BilledConsultationCard'
import CreatePaymentForm from 'components/bills/CreatePaymentForm'
import PaymentCard from 'components/bills/PaymentCard'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { getBilled, getPayments } from 'queries/payments'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import { Dialog } from 'primereact/dialog'

export default function Page(): ReactElement {
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
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
    <Card className='flex flex-column h-full'>
      <Dialog
        header='Generar Cobro'
        visible={createBill}
        onHide={closeCreateBill}
      >
        <CreatePaymentForm></CreatePaymentForm>
      </Dialog>
      <Button
        onClick={openCreateBill}
        size='small'
        label='Generar Cobro'
        icon='pi pi-plus'
        iconPos='right'
      />
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
    </Card>
  )
}
