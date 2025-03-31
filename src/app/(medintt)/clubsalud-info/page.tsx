'use client'

import { Button } from 'primereact/button'
import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import CarouselClubSalud from 'components/Medintt/ClubSalud/CarouselClubSalud'
import AccordionClubSalud from 'components/Medintt/ClubSalud/AccordionClubSalud'

export default function ClubSaludInfo(): ReactElement {
  const router: AppRouterInstance = useRouter()
  return (
    <div className='flex flex-column justify-content-center align-items-start m-6 ml-8 text-primary'>
      {/* Intro */}
      <div className='flex flex-row justify-content-center gap-8 ml-8 pl-7'>
        <div className='flex flex-column gap-4 w-29rem mr-8'>
          <span className='text-3xl'>Club Salud</span>
          <span>
            Club Salud es un gimnasio dentro de Medintt dirigido a recuperar,
            mejorar y fomentar la salud a través del movimiento. Utilizamos el
            ejercicio físico para mejorar respuestas y funciones alteradas por
            patologías crónicas, síndromes y alteraciones de patrones de
            movimiento. Brindamos este espacio a particulares y también a las
            empresas, donde los empleados puedan hacer ejercicio y fortalecer
            sus relaciones. Con el respaldo profesional de médicos especialistas
            en traumatología, deportología y educación física; dentro de un
            Centro de Salud Integral con más de diez años de trayectoria, te
            presentamos nuestra propuesta.
          </span>
        </div>
        <img
          src='/medintt/pesas.png'
          alt=''
          className='w-30rem'
        />
      </div>

      {/* Sobre */}
      <div className='flex flex-column gap-4 px-7 mx-8 mt-6'>
        <span className='text-3xl'>Sobre nuestra empresa</span>
        <span>
          Club salud es un programa de ejercicio físico adaptado bajo
          seguimiento y prescripción médica. Sostenemos que el ejercicio físico
          es salud, y por eso diseñamos este espacio con el objetivo principal
          de mejorar tu calidad de vida y bienestar.
        </span>
      </div>

      {/* Accion */}
      <div className='flex flex-column gap-4 px-7 mx-8 mt-6'>
        <span className='text-3xl'>Club Salud en acción</span>
        <span>
          Club Salud surge de la necesidad de promover la salud a través de las
          prácticas físicas. Desde un equipo multidisciplinario en formación
          constante, nos encargamos de dar respaldo y seguimiento personalizado
          a cada socio/a que utiliza el programa. Nos diferenciamos por preparar
          deportistas que compiten a nivel nacional. Cuidamos la longevidad de
          los deportistas, asegurando que su entrenamiento sea seguro y
          sostenible en el tiempo.
        </span>
      </div>

      {/* Sucursal */}
      <div className='flex flex-column gap-4 px-7 mx-8 mt-6'>
        <span className='text-3xl'>Nueva Sucursal</span>
        <span>
          Nuestro nuevo gimnasio se encuentra en Confluencia esquina Puerto
          Rico. Es un espacio amplio y luminoso de dos plantas. Los horarios
          serán de 8.00 a 20.00 hs.
        </span>
      </div>

      {/* Contacto */}
      <div className='flex flex-column gap-2 px-7 mx-8 mt-6'>
        <Button
          icon='pi pi-whatsapp'
          link
          size='small'
          style={{ color: 'var(--primary-color)' }}
          label='+54 9 299 593-8812'
          className='w-max'
          onClick={() => {
            window.open(
              'https://api.whatsapp.com/send/?phone=%2B5492994587079&text&type=phone_number&app_absent=0',
              '_blank'
            )
          }}
        />
        <Button
          icon='pi pi-map-marker'
          link
          size='small'
          style={{ color: 'var(--primary-color)' }}
          label='Puerto Rico esquina Confluencia. Cipolletti, Río Negro'
          className='w-max'
          onClick={() => {
            window.open('https://maps.app.goo.gl/CgYmBWn5RuzmaQ5i8', '_blank')
          }}
        />
        <Button
          icon='pi pi-instagram'
          link
          size='small'
          style={{ color: 'var(--primary-color)' }}
          label='Club Salud'
          className='w-max'
          onClick={() => {
            window.open('https://www.instagram.com/clubsalud.medintt', '_blank')
          }}
        />
      </div>
      <div className='flex flex-row w-full justify-content-center align-items-center'>
        <CarouselClubSalud />
        <AccordionClubSalud />
      </div>
      <Button
        label='Ingresar'
        size='small'
        className='w-max align-self-end'
        onClick={() => {
          router.push('/clubsalud')
        }}
      />
    </div>
  )
}
