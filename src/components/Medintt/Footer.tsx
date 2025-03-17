'use client'

import { Button } from 'primereact/button'
import { type ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <div className='flex flex-row text-primary align-items-center justify-content-between sm:px-3 lg:px-6 py-4'>
      <div className='flex flex-row align-items-center gap-2 xl:gap-6'>
        <span className='text-xs'>
          📞 Contactanos y empecemos a trabajar juntos
        </span>
        <Button
          label='Contactar'
          className='border-round-xl'
          onClick={() => {
            window.open(
              'https://api.whatsapp.com/send/?phone=%2B5492994587079&text&type=phone_number&app_absent=0',
              '_blank'
            )
          }}
        />
      </div>
      <img
        src='/logos/medintt_positivo_rectangle.png'
        alt=''
        className='h-3rem'
      />
    </div>
  )
}
