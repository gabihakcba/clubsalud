'use client'

import Span from '../../../components/Medintt/Span'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'

export default function Contact(): ReactElement {
  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <Span type='primary' className='font-bold text-2xl my-6'>Contacto</Span>
      <Divider />
      <p>Av Alem 1431 (Alem y Psje. Rawson)</p>
      <p>Cipolletti, Rio Negro – Argentina</p>
      <Span type='primary' className='font-bold text-2xl my-6'>Turnos</Span>
      <p>Lunes a Viernes de 8:30 a 20:30 hs.</p>
      <p>Sólo mensajes de Whtasapp.</p>
      <Button
        link
        onClick={() => {
          window.open(
            'https://api.whatsapp.com/send/?phone=%2B5492994587079&text&type=phone_number&app_absent=0',
            '_blank'
          )
        }}
        icon='pi pi-whatsapp'
        label='2994 58-7079'
      />
    </div>
  )
}
