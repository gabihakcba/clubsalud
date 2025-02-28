'use client'

import { Button } from 'primereact/button'
import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Divider } from 'primereact/divider'
import CarouselClubSalud from 'components/Medintt/ClubSalud/CarouselClubSalud'
import AccordionClubSalud from 'components/Medintt/ClubSalud/AccordionClubSalud'
import Span from '../../../components/Medintt/Span'

export default function ClubSaludInfo(): ReactElement {
  const router: AppRouterInstance = useRouter()
  return (
    <div className='flex flex-column justify-content-center mt-6 mx-2 px-2 md:mx-4 md:px-4 lg:mx-8 lg:px-8 gap-4'>
      <Button
        label='Ingresar'
        link
        size='small'
        className='w-max align-self-end'
        onClick={() => {
          router.push('/clubsalud')
        }}
      />
      <div>
        <Span
          type='primary'
          className='font-bold text-2xl'
        >
          Club Salud
        </Span>
        <Divider />
        <p>
          Club Salud es un gimnasio dentro de Medintt dirigido a recuperar,
          mejorar y fomentar la salud a través del movimiento. Utilizamos el
          ejercicio físico para mejorar respuestas y funciones alteradas por
          patologías crónicas, síndromes y alteraciones de patrones de
          movimiento. Brindamos este espacio a particulares y también a las
          empresas, donde los empleados puedan hacer ejercicio y fortalecer sus
          relaciones. Con el respaldo profesional de médicos especialistas en
          traumatología, deportología y educación física; dentro de un Centro de
          Salud Integral con más de diez años de trayectoria, te presentamos
          nuestra propuesta.
        </p>
      </div>
      <div>
        <Span
          type='primary'
          className='font-bold text-2xl'
        >
          Sobre nuestra empresa
        </Span>
        <Divider />
        <p>
          Club salud es un programa de ejercicio físico adaptado bajo
          seguimiento y prescripción médica. Sostenemos que el ejercicio físico
          es salud, y por eso diseñamos este espacio con el objetivo principal
          de mejorar tu calidad de vida y bienestar.
        </p>
      </div>
      <div>
        <Span
          type='primary'
          className='font-bold text-2xl'
        >
          Club Salud en acción
        </Span>
        <Divider />
        <p>
          Club Salud surge de la necesidad de promover la salud a través de las
          prácticas físicas. Desde un equipo multidisciplinario en formación
          constante, nos encargamos de dar respaldo y seguimiento personalizado
          a cada socio/a que utiliza el programa. Nos diferenciamos por preparar
          deportistas que compiten a nivel nacional. Cuidamos la longevidad de
          los deportistas, asegurando que su entrenamiento sea seguro y
          sostenible en el tiempo.
        </p>
      </div>
      <div>
        <Span
          type='primary'
          className='font-bold text-2xl'
        >
          Nueva Sucursal
        </Span>
        <Divider />
        <p>
          Nuestro nuevo gimnasio se encuentra en Confluencia esquina Puerto
          Rico. Es un espacio amplio y luminoso de dos plantas. Los horarios
          serán de 8.00 a 20.00 hs.
        </p>
      </div>

      <ul>
        <li>Whatsapp: +54 9 299 593-8812</li>
        <li>
          Ubicación: Puerto Rico esquina Confluencia. Cipolletti, Río Negro
        </li>
        <li>Instagram: Club Salud</li>
      </ul>

      <div className='flex flex-column align-items-center lg:align-items-start lg:flex-row w-full'>
        <div
          className='w-20rem md:w-25rem lg:w-500px'
          style={{ width: '500px' }}
        >
          <CarouselClubSalud />
        </div>
        <div className='w-20rem md:w-25rem lg:w-30rem my-4 lg:my-0'>
          <AccordionClubSalud />
        </div>
      </div>
    </div>
  )
}
