'use client'

import { Button } from 'primereact/button'
import { type ReactElement } from 'react'

export default function Contact(): ReactElement {
  return (
    <div className='grid text-primary h-full my-7'>
      <div className='col-6'>
        <div className='w-full h-full flex flex-column justify-content-center align-items-center gap-3'>
          <span className='text-4xl align-self-start pl-8 ml-8'>Contacto</span>
          <span className='max-w-20rem text-center'>
            Av Alem 1431 (Alem y Psje. Rawson) Cipolletti, Rio Negro – Argentina
          </span>
          <div className='border-round-2xl shadow-4 overflow-hidden'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.3278351233416!2d-67.98238312317824!3d-38.93933829920322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a30f4663b02cb%3A0x2b32488ce9bfb190!2sMEDINTT%20SRL!5e0!3m2!1ses-419!2sar!4v1742007036003!5m2!1ses-419!2sar'
              width='200'
              height='200'
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='h-full w-full -2 flex flex-column gap-6 align-items-start justify-content-start pl-8'>
          <span className='text-2xl w-max'>Redes</span>
          <div className='flex flex-row gap-4justify-content-center'>
            <Button
              link
              icon='pi pi-instagram'
              size='large'
              style={{ color: 'var(--primary-color)' }}
              onClick={() => {
                window.open(
                  'https://www.instagram.com/medinttcentromedico',
                  '_blank'
                )
              }}
            />
            <Button
              link
              icon='pi pi-facebook'
              size='large'
              style={{ color: 'var(--primary-color)' }}
              onClick={() => {
                window.open('https://www.facebook.com/medintt', '_blank')
              }}
            />
            <Button
              link
              icon='pi pi-linkedin'
              size='large'
              style={{ color: 'var(--primary-color)' }}
              onClick={() => {
                window.open(
                  'https://www.linkedin.com/company/medintt-salud-ocupacional-integral',
                  '_blank'
                )
              }}
            />
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='flex flex-column w-30rem h-full align-items-start justify-content-center pl-8 ml-8 gap-3'>
          <span className='text-2xl'>Turnos</span>
          <span>
            <span>Lunes a Viernes de 8:30 a 20:30 hs.</span>
            <br />
            <span>Sólo mensajes de Whatsapp.</span>
          </span>
          <Button
            label='2994 58-7079'
            icon='pi pi-whatsapp'
            iconPos='left'
            link
            onClick={() => {
              window.open(
                'https://api.whatsapp.com/send/?phone=%2B5492994587079&text&type=phone_number&app_absent=0',
                '_blank'
              )
            }}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='w-full h-full flex justify-content-end'>
          <img
            src='/medintt/multigota.png'
            alt=''
            className='w-7rem'
          />
        </div>
      </div>
    </div>
  )
}
