'use client'

import { Button } from 'primereact/button'
import { type ReactElement } from 'react'
import Span from './Span'

export default function Appointment(): ReactElement {
  return (
    <section className='w-screen bg-gray-100 p-6 flex flex-column md:flex-row gap-8 justify-content-center align-items-center'>
      <div className='flex flex-column gap-4 align-items-center justify-content-center text-center'>
        <Span
          type='primary'
          className='text-2xl'
        >
          TURNOS
        </Span>
        <Span type='secondary'>Solicitá turnos ahora</Span>
      </div>
      <div className='flex flex-column gap-4 align-items-center justify-content-center'>
        <span className='flex justify-content-center align-items-center gap-2'>
          <i className='pi pi-whatsapp'></i>
          <b>2994 58-7079</b>
        </span>
        <span className='flex flex-column gap-2 justify-content-center align-items-center text-center'>
          <Span type='secondary'>Lunes a Viernes de 8:30 a 20:30</Span>
          <Span type='secondary'>Sólo mensajes de Whtasapp.</Span>
        </span>
      </div>
      <Button
        label='SOLICITAR TURNO'
        size='small'
        rounded
        onClick={() => {
          window.open(
            'https://api.whatsapp.com/send/?phone=%2B5492994587079&text&type=phone_number&app_absent=0',
            '_blank'
          )
        }}
      />
    </section>
  )
}
