'use client'

import { Button } from 'primereact/button'
import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Divider } from 'primereact/divider'
import CarouselClubSalud from 'components/Medintt/ClubSalud/CarouselClubSalud'
import AccordionClubSalud from 'components/Medintt/ClubSalud/AccordionClubSalud'

export default function ClubSaludInfo(): ReactElement {
  const router: AppRouterInstance = useRouter()
  return (
    <div className='flex flex-column justify-content-center mt-6 mx-8 px-8 gap-4'>
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
        <span className='font-bold text-2xl text-green-500'>Club Salud</span>
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
        <span className='font-bold text-2xl text-green-500'>
          Sobre nuestra empresa
        </span>
        <Divider />
        <p>
          Club salud es un programa de ejercicio físico adaptado bajo
          seguimiento y prescripción médica. Sostenemos que el ejercicio físico
          es salud, y por eso diseñamos este espacio con el objetivo principal
          de mejorar tu calidad de vida y bienestar.
        </p>
      </div>
      <div>
        <span className='font-bold text-2xl text-green-500'>
          Club Salud en acción
        </span>
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
        <span className='font-bold text-2xl text-green-500'>
          Nueva Sucursal
        </span>
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

      <div className='flex justify-content-center align-items-start w-full'>
        <div
          className=''
          style={{ width: '500px' }}
        >
          <CarouselClubSalud />
        </div>
        <div className='w-30rem'>
          <AccordionClubSalud />
        </div>
      </div>
    </div>
  )
}
